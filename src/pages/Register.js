import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

export default function Register(){

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isActive, setIsActive] = useState(false);
	const {isLogged} = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(()=>{
		if(
			(
				firstName !== "" &&
			 	lastName !== "" && 
			 	email !== "" &&
			 	mobileNo !== "" && 
			 	password !== "" &&
			 	confirmPassword !== "" 
		 	) 
		 	&&
		 	(
		 		 mobileNo.length >=10
		 	)
		 	&&
		 	(
		 		password === confirmPassword
		 	)
			){
				setIsActive(true);
		} else {
			setIsActive(false);
		}
	},[firstName, lastName, email, mobileNo, password, confirmPassword]);

	const  registerUser = async (event) => {

		event.preventDefault();
		const url = `${process.env.REACT_APP_API_URL}/b5/users/`;
		const user = {firstName,lastName,email,mobileNo, password, confirmPassword}

		try {
			const fetchUser = await fetch(url, {
				method: "POST",
				headers: {
					'Content-Type' : 'application/json'
				},
				body:(JSON.stringify(user))
			})

			if(fetchUser.ok){
				setFirstName('');
				setLastName('');
				setEmail('');
				setMobileNo('');
				setPassword('');

				const success = await Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Registered Successfully'
				})
				
				if(success.isConfirmed) navigate("/login")
				
			} else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
			}
		} catch (error) {
			console.log("Something went wrong "+error)
		}
	}

	return(
		(isLogged === true)?
	    	<Navigate to="/" />
    	: 
    	<div className="container" style={{ width: '600px'}}>  	
		<Form onSubmit={(event) => registerUser(event) }>
			<h1 className="my-5 text-center">Register</h1>
			<Form.Group>
				<Form.Label>First Name: </Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter First Name" 
					required 
					onChange={e=>{
						setFirstName(e.target.value)
					}} 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name: </Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter Last Name" 
					required 
					onChange={e=>{
						setLastName(e.target.value)
					}} 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email: </Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter Email" 
					required 
					onChange={e=>{
						setEmail(e.target.value)
					}} 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Mobile Number: </Form.Label>
				<Form.Control 
					type="number" 
					placeholder="Enter Mobile Number" 
					required 
					onChange={e=>{
						setMobileNo(e.target.value)
					}} 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password: </Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter Password" 
					required 
					onChange={e=>{
						setPassword(e.target.value)
					}} 
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password: </Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Confirm Password" 
					required 
					onChange={e=>{
						setConfirmPassword(e.target.value)
					}} 
				/>
			</Form.Group>

			{
				isActive === true ?
				<Button className = "mt-3 py-2 text-white border-secondary border" variant="info" type="submit" id="submitBtn">Submit</Button>
				:
				<div className="bg-secondary text-center text-info mt-3 border-secondary border py-2 rounded">
				Kindly enter your registration details.
				</div>
			}

		</Form>
			<div className="text-center pt-2">
				<p><i> Already have an account? Click <a href="/login">here</a> to log in. </i></p>
			</div>
		</div>


	)

}