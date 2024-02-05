import { useState } from "react";
const ProductList = ({product,i,handleSave,onArchive}) => {
    const [toEdit, setToEdit] = useState(false);
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    
  return (
    <>
        <tr>
            <td>{i+1}</td>
            {
            toEdit ? 
            (<><td><input type="text" value={name} onChange={e=>setName(e.target.value)}/></td>
            <td><input type="text" value={description} onChange={e=>setDescription(e.target.value)}/></td>
            <td><input type="number" value={price} onChange={e=>setPrice(e.target.value)}/></td></>)
            :(<><td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td></>)
            }
            {product.isActive ? (<td className="text-success">Available</td>):(<td className="text-danger">Unavailable</td>)}
            {toEdit ? (<td><button className="btn btn-success" onClick={()=>handleSave(product._id,name,description,price,setToEdit)}>Save</button></td>)
            :
            (<td><button className="btn btn-primary" onClick={()=>setToEdit(true)}>Edit</button></td>)}
            {product.isActive ? (<td><button className="btn btn-danger" onClick={()=>onArchive(product._id, product.isActive)}>Archive</button></td>):(<td><button className="btn btn-success" onClick={()=>onArchive(product._id, product.isActive)}>Activate</button></td>)}
        </tr> 
    </>
  )
}

export default ProductList