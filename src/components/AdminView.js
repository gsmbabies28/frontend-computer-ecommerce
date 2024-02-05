import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import AddProducts from './AddProducts';
import ProductList from './subcomponents/ProductList';
import { NavLink } from 'react-router-dom';

function AdminView() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [products, setProducts] = useState(null);


    const handleActivate = async (id, isActive)=>{

        try{
            if(isActive){
                const url = `${process.env.REACT_APP_API_URL}/b5/products/${id}/archive`;
                const archiveProduct = await fetch(url,{
                    method: "PATCH",
                    headers:{
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${ localStorage.getItem('access') }`
                    }
                }); 
                if(archiveProduct.ok){
                    
                    setProducts(products.map(product=>{
                        if(product._id === id){
                            return {...product, isActive: false}
                        }else{
                            return product
                        }
                    }));

                } else {
                    alert("Something went wrong")
                }

            } else {

                const url = `${process.env.REACT_APP_API_URL}/b5/products/${id}/activate`;
                const activeProduct = await fetch(url,{
                    method: "PATCH",
                    headers:{
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${ localStorage.getItem('access') }`
                    }
                }); 

                if(activeProduct.ok){

                    setProducts(products.map(product => {
                        if(product._id === id){
                            return {...product, isActive: true}
                        }else{
                            return product
                        }
                    }));

                } else {
                    alert("Something went wrong")
                }
            }

        }catch(err){
            alert("Something went error");
        }

    }

    const handleSave = async (id,name,description,price,setEdit) => {

        const url = `${process.env.REACT_APP_API_URL}/b5/products/${id}/update`;

        try{
            const newUpdate = {
                name: name,
                description: description,
                price: price
            }
            const updateProduct = await fetch(url,{
                method: "PATCH",
                headers:{
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${ localStorage.getItem('access') }`
                },
                body: JSON.stringify(newUpdate)
            });

            if(updateProduct.ok){

                const data = await updateProduct.json();

                const newProduct = products.map(product => {
                    if(product._id === data.result._id){
                        return {...product, ...data.result}
                    }else {
                        return product;
                    }
                })
                setProducts(newProduct)

            }else{
                alert("Cannot Save Product")
            }

            setEdit(false)

        }catch(err){
            alert("Something Went wrong!");
        }
    }

    useEffect(()=>{
        
        const fetchAllProducts = async () =>{
            const url = `${process.env.REACT_APP_API_URL}/b5/products/all`;
            const getProducts = await fetch(url,{
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${ localStorage.getItem('access') }`
                }
            })

            if(getProducts.ok){

                const data = await getProducts.json();
                setProducts(data.results)

            } else {

                setProducts([]);

            }
        }

        fetchAllProducts();

    },[])
    
   
  return (
    <div className='container text-center mt-5'>
        <h1>Admin DashBoard</h1>
        <div className='buttons'>
            <Button variant="primary" onClick={handleShow}>Add Products</Button>
            <NavLink to="/profile">
                <button className='btn btn-success mx-3'>Show All Orders</button>
            </NavLink>
        </div> 
        <div className='products mt-5'>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th colSpan="2">Edit/Action</th>
                    </tr>
                </thead>
                <tbody>

                    {!products ? 
                        (<tr><td colSpan={6}>No products listed</td></tr>) 
                        : 
                        (products?.map((product,i)=>
                        <ProductList key={product._id} product={product} i={i} handleSave={handleSave} onArchive={handleActivate} />
                        ))
                    }

                </tbody>
            </Table>        
        </div>
        <AddProducts show = {show} handleClose={handleClose}  setProducts={setProducts} products={products}/>
    </div>
  );
}

export default AdminView;