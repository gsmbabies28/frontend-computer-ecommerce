import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState,useEffect} from 'react'
const AddProducts = ({show, handleClose, setProducts,products}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [showSubmit, setShowSubmit] = useState(true)
    
    useEffect(()=>{
        if(name!=='' && description!=='' && price!==''){
            setShowSubmit(false)
        }
    },[name,description,price])
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}/b5/products/`;
        try{
            const newProduct ={
                name: name,
                description: description,
                price: price
            }
            const onSubmitting = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${ localStorage.getItem('access') }`
                },
                body: JSON.stringify(newProduct)
            });
            if(onSubmitting.ok){
                const data = await onSubmitting.json();
                setName('');
                setDescription('');
                setPrice('');
                setShowSubmit(true);
                setProducts([...products, data.result])
                alert("Product has been added!")
            }
        } catch(err){
            alert("Something went wrong in saving")
        }
     
    }

    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event)=>handleSumbit(event)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="product-name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control type="number" autoFocus value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </Form.Group>
            
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={showSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
        </>
  )
}

export default AddProducts