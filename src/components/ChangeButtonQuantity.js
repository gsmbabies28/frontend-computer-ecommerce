import { useState } from "react"
const ChangeButtonQuantity = ({changeQuantity, quantity, id, subTotal}) => {
    const [quantity1, setQuantity1] = useState(quantity)
    const [subTotal1 ,setSubTotal1] = useState(subTotal)
    const price = subTotal/quantity;

    const handleClickMinus = () => {
        changeQuantity(id,"-", quantity1);
        setQuantity1(quantity1-1);
        setSubTotal1(subTotal-price);
    }
    const handleClickAdd = () => {
        changeQuantity(id,"+", quantity1);
        setQuantity1(quantity1+1);
        setSubTotal1(subTotal+price);
    }
  return (
    <>
       <td>
        <button className='btn btn-light py-0 px-2' onClick={handleClickMinus}>-</button>
          <span className='p-2'>
            {quantity1}
          </span>
        <button onClick={handleClickAdd} className='btn btn-light py-0 px-2'>+</button>
      </td>
      <td>
         {subTotal1}
      </td>
    </>
     
  )
}

export default ChangeButtonQuantity