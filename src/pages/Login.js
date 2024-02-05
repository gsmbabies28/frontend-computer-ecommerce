import {Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';

export default function Login({setIsLogged, isLogged}){
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(email !== "" && password !== ""){
      setIsActive(true)
    }
    else{
      setIsActive(false);
    };
  },[email, password]);


  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/b5/users/login`,{
    method: 'POST',
    headers: {'Content-Type' : "application/json"},
    body: JSON.stringify({
      email: email,
      password: password
      }),
      })
      .then((response) => response.ok ? response.json() :  null )
      .then((data) => {
          if (data!==null){
            localStorage.setItem('access', data.token);
            Swal.fire({
              title: 'Welcome!',
              icon: 'success',
              text: 'Thank you for logging in'
            });
            setIsLogged(true);
            navigate("/")
          } else {
            Swal.fire({
              title: 'User and Password do not Match',
              icon: 'error',
              text: 'Please try again'
            });
      }
    }).catch(err=>console.log(err));

  }

  return(
    <>
      {isLogged ? (<Navigate to="/"/>)
      :
      (<div className="container" style={{ width: '600px'}}>
      <Form onSubmit={(event) => handleLogin(event) }>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter Email" 
            required 
            value={email}
            onChange={event=>{
              setEmail(event.target.value)
            }} 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter Password" 
            required
            value = {password}
            onChange={event=>{
              setPassword(event.target.value)
            }
          } />
        </Form.Group>

        {
          isActive ?
          <Button className = "mt-3" variant="primary" type="submit" id="submitBtn2">Submit</Button>
          :
          <Button className = "mt-3"  variant="primary" type="submit" id="submitBtn2" disabled>Submit</Button>
        }
      </Form>
      </div>)
      }
    </>
  )
}