import { useState,useEffect, useContext } from 'react'
import CartProduct from '../components/CartProduct';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

const Cart = () => {
    
    const [cartProducts, setCartProducts] = useState(null);
    const productsId = cartProducts?.cartItems;
    let totalPrice = productsId?.reduce((total,amount) => total+amount.subTotal,0);
    const {isLogged} = useContext(UserContext)
    useEffect(()=>{
        const fetchUserCart = async () => {
            try{
                const getCart = await fetch(`${process.env.REACT_APP_API_URL}/b5/users/get-cart`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                })
                if(getCart.ok){
                    const data = await getCart.json();
                    setCartProducts(data.userCart);
                }else {
                    console.log("NO products")
                }
            }catch(err){
                console.log('Cannot Connect to Server')
            }
        }
        fetchUserCart();
    },[])


    const changeQuantity = async (id,plusMinus,quantity) => {
        try{
            if(plusMinus==="-"){
                if(quantity===1){
                    return;
                }
                const url = `${process.env.REACT_APP_API_URL}/b5/users/update-cart-quantity`
                const fetchQuantity = await fetch(url,{
                    method: "PATCH",
                    headers:{
                        "Content-Type" : "application/json",
                         Authorization:  `Bearer ${localStorage.getItem('access')}`
                    },
                    body: JSON.stringify({productId: id, quantity: quantity-1})
                });
                if(fetchQuantity.ok){
                    const data = await fetchQuantity.json();
                    setCartProducts(data);
                }else{
                    console.log("Error in Changing quantity")
                }
                productsId?.filter(product=>product.productId === id)
            }
            if(plusMinus==="+"){
                const url = `${process.env.REACT_APP_API_URL}/b5/users/update-cart-quantity`
                const fetchQuantity = await fetch(url,{
                    method: "PATCH",
                    headers:{
                        "Content-Type" : "application/json",
                         Authorization:  `Bearer ${localStorage.getItem('access')}`
                    },
                    body: JSON.stringify({productId: id, quantity: quantity+1})
                });
                if(fetchQuantity.ok){
                    const data = await fetchQuantity.json();
                    setCartProducts(data);
                }else{
                    console.log("Error in Changing quantity")
                } 
            }
                    
        }catch(err){
            console.log("Something went wrong");
        }
    }

    const removeFromCart = async (id) => {
        try{
            const url = `${process.env.REACT_APP_API_URL}/b5/users/${id}/remove-from-cart`;
            const removeProduct = await fetch(url,{
                method: "POST",
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            });
            if(removeProduct.ok){
                const data = await removeProduct.json();
                setCartProducts(data)
            }
        }catch(err){
            console.log("Something went wrong");
        }
    }

    const checkOutOrder = async () => {
        const url = `${process.env.REACT_APP_API_URL}/b5/users/checkout`;
        const confirm = await Swal.fire({
            title: "Ready to checkout?",
            text: "Click checkout",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Check out now!"
          })
        if(confirm.isConfirmed){
            try {
                const checkOut = await fetch(url,{
                    method :"POST",
                    headers:{
                        'Content-Type' : "application/json",
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                });
                if(checkOut.ok){
                    Swal.fire({
                        title: "Thank you!",
                        text: "Your have successfully ordered a product!.",
                        icon: "success"
                      });
                    setCartProducts(null);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!, Maybe you have no Items in your cart",
                      });
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <>
        {isLogged ?
        (
            <table className="table table-dark table-striped mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {productsId?.map(product=>{
                    return (
                        <CartProduct  
                            key={product.productId}
                            product={product.productId} 
                            subTotal={product.subTotal}
                            quantity = { product.quantity }
                            changeQuantity = { changeQuantity }
                            removeFromCart = { removeFromCart }
                        />
                    )
                })}
                <tr>
                    <td colSpan={3}><button className='btn btn-success' onClick={checkOutOrder}>Checkout Order</button></td>
                    <td>{totalPrice}</td>
                    <td>Total</td>
                </tr>
            </tbody>
        </table>  
        ) : (<Navigate to="/login"/>)}
       
    </>
  )
}

export default Cart