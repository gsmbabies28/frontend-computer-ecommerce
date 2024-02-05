import {Container, Nav, Navbar} from 'react-bootstrap'; 
import {Link, NavLink} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext'

export default function AppNavBar(){

	const { user } = useContext(UserContext);

	return(
		<Navbar expand="lg" className="bg-body-tertiary">
	      <Container fluid className='d-flex'>
	        <Navbar.Brand as={Link} to = "/">Computer E-Commerce</Navbar.Brand>
	        <Navbar.Toggle aria-controls="basic-navbar-nav" />
	        <Navbar.Collapse id="basic-navbar-nav">
	          <Nav className="ms-auto">
			  	
	            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
	            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
	            { (user.id !== null)?
	            	<>
					{ !user.isAdmin && <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link> }
	            	<Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
	            	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
	            	</>
	            	:
	            	<>
		            	<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
		            	<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
	            	</>
	        	}
	        	
	            
	          </Nav>
	        </Navbar.Collapse>
	      </Container >
	    </Navbar>
)}