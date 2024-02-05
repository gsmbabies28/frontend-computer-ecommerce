import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ProductDetails = () => {
const [product, setProduct] = useState({});
const [quantity, setQuantity] = useState(1);
const {id, imgId} = useParams();

useEffect(()=>{
   ( async () => {
    const url = `${process.env.REACT_APP_API_URL}/b5/products/${id}`
    const getProduct = await fetch(url);
    if(getProduct.ok){
      const data = await getProduct.json();
      setProduct(data.result);
    } else {
      alert("Something went wrong!")
    }
  })()
},[id]);

  const addToCart = async () => {
    const toAdd = {
      productId: product._id,
      quantity: quantity,
      subTotal: product.price*quantity
    }
    try{
      const url = `${process.env.REACT_APP_API_URL}/b5/users/add-to-cart`
      const fetchCart = await fetch(url,{
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
          Authorization:  `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify(toAdd)
      })
      if(fetchCart.ok){
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Successfully added item to cart",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Please log in to shop",
          text: "You need to login to shop",
        });
      }
    }catch(err){
      alert("Something went wrong");
    }
  }
 
  const toggleQuantity = (counter) => {
    if(counter === "-"){
      if(quantity===1){
        return;
      }
      setQuantity(quantity-1)
    }else{
      setQuantity(quantity+1)
    }
  }

  return (
    <>
      <div className="container card my-3 ">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`https://picsum.photos/id/${imgId}/500/500`} className="img-fluid rounded-start p-0" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}.</p>
              <p className="card-text text-danger">₱ {product.price}</p>
              <p className="card-text"><small className="text-body-secondary"></small></p>
              <button className="btn btn-dark" onClick={()=>toggleQuantity("-")}>-</button>
              <span className="p-3 text-dark"><strong>{quantity}</strong></span>
              <button className="btn btn-dark" onClick={()=>toggleQuantity("+")}>+</button>
              <div id="add-to-cart">
                <button className="btn btn-primary my-4" onClick={addToCart}>Add to Cart</button>
              </div>
              <div className="mt-3">
                <Link to="/products">Back to products</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default ProductDetails