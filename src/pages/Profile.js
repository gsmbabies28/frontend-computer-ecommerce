import UserContext from "../UserContext"
import { useContext, useEffect, useState } from "react"
import OrderCard from "../components/OrderCard";
import { Link } from "react-router-dom";
import UpdatePassword from "../components/UpdatePassword";

const Profile = () => {
    const { user } = useContext(UserContext);
    const [order, setOrder] = useState(null);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    useEffect(()=>{

       fetchAllOrder();

    },[user.isAdmin])
    console.log(order)
    function fetchAllOrder(){

        if(user.isAdmin){
            const url = `${process.env.REACT_APP_API_URL}/b5/users/all-orders`;
            fetch(url,{
                headers: {
                    'Content-Type' : "application/json",
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(result=>{
                if(result.ok)
                return result.json()
                return null
            })
            .then(data=>setOrder(data))
            .catch(err=>console.log("Something went wrong in fetching data" + err))
        } else {
            const url = `${process.env.REACT_APP_API_URL}/b5/users/my-orders`;
            fetch(url,{
                headers: {
                    'Content-Type' : "application/json",
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(result=>{
                if(result.ok)
                return result.json()
                return null
            })
            .then(data=>setOrder(data))
            .catch(err=>console.log("Something went wrong in fetching data" + err))
        }
    }

    const onChangePassword = async (event,newPassword, confirmPassword) => {
        event.preventDefault();
        if(newPassword!==confirmPassword) return alert('Password do not match')
        const url = `${process.env.REACT_APP_API_URL}/b5/users/update-password`;
        try {
            const toChangePassword = await fetch(url,{
                method: "PATCH",
                headers: {
                    'Content-Type' : "application/json",
                    Authorization : `Bearer ${localStorage.getItem('access')}`
                },
                body: (JSON.stringify({
                    newPassword : newPassword,
                    confirmPassword: confirmPassword
                }))
            });
            if(toChangePassword.ok){
                alert("Password successfuly reset!")
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.log("Somethinig went wrong"+error)
        }
    }

    return (
        <div className="container mt-3">
            <div className="row d-flex text-center">
                <div className="col-md-8 offset-md-2">
                    <h6>
                        Profile Details
                    </h6>
                    <span className="fs-4 text-success">
                        {user.isAdmin && "Welcome Admin - "} {user.name}
                    </span>
                </div>
                <div className="col-md-2">
                    <Link style={{textDecoration: 'none'}} className="text-success" onClick={handleShow}>Change Password</Link>
                </div>
            </div>
            <div className="text-center mt-5  gap-5">
                <h2>Order History</h2>
                {order && order?.map(item=><OrderCard key={item._id} order={item}/>)}
            </div>
            <UpdatePassword  show={show} handleClose={handleClose} handleSubmit={onChangePassword}/>
        </div>
    )
}

export default Profile