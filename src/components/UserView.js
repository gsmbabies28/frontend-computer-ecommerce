import ProductCard from "./subcomponents/ProductCard"
import { useState,useEffect } from "react";
import SearchBar from './SearchBar';


const UserView = () => {

    const [products, setProducts] = useState(null);

    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}/b5/products/`
        fetch(url)
        .then(res=>{
            if(res.ok){
                return res.json();
                
            } else {
                return alert("Error in Fetching Products")
            }
        })
        .then(data=>{
             setProducts(data.result)
        }).catch(err=>setProducts(null))
    },[])

  
    const onSearchProduct = async (product) => {
        const url = `${process.env.REACT_APP_API_URL}/b5/products/searchByName`
        try {
            const fetchData = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type' : "application/json",
                },
                body: (JSON.stringify({name: product}))
            });
            if(fetchData.ok){
                const result = await fetchData.json();
                setProducts(result.result);
            } else {
                setProducts(null)
            }
        } catch (error) {
            console.log("Something went wrong"+error)
        }

    }
  return (
    <div className="bg-white my-3" id="shop-product">
        <div className="row flex align-items-center" id="header-product">
            <div className="col-md-6 offset-md-3">
                <h2 className="text-center container">Shop Product</h2>
            </div>
            <div className="col-md-3">
            <SearchBar handleSearch = {onSearchProduct} />
            </div>
        </div>
        <div className="row mt-5" id="products-list">
                {products ? (products?.map((product,index)=> <ProductCard key={product._id} product={product} id={index}/> ))
                    :
                    <div className="text-center">
                        No Products found
                    </div>
                }
        </div>
    </div>
  )
}

export default UserView