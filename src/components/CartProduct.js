import { useState, useEffect } from "react"

const CartProduct = ({product, subTotal, quantity, changeQuantity, removeFromCart}) => {
    const [name, setName] = useState('')

    useEffect(()=> {
        const fetchProduct = async () => {
            const url = `${process.env.REACT_APP_API_URL}/b5/products/${product}`
            const getProduct = await fetch(url);
            if(getProduct.ok){
              const data = await getProduct.json();
              setName(data.result)
            } else {
              alert("Something went wrong!")
            }   
          }
        fetchProduct();
    },[product]);

  return (
    <tr>
      <td>{name.name}</td>
      <td>{name.price}</td>
      <td>
        <button className='btn btn-light py-0 px-2' onClick={() => { changeQuantity(product,"-", quantity) }} >-</button>
        <span className='p-2'>
            {quantity}
        </span>
        <button  className='btn btn-light py-0 px-2' onClick={() => { changeQuantity(product,"+", quantity) }}>+</button>
      </td>
      <td>{subTotal}</td>
      <td><button className='btn btn-danger' onClick={ () => removeFromCart(product) }>Remove</button></td>
    </tr>
  )
}

export default CartProduct