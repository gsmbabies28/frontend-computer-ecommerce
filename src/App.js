import './App.css';

// components
import AppNavBar from './components/AppNavBar';

// pages
import Home from './pages/Home';
import Product from './pages/Product'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout'
import Error from './pages/Error';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile'
//modules
import { Container } from 'react-bootstrap';

import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import {useState, useEffect} from 'react';
import {UserProvider} from "./UserContext"

function App() {
  const [user, setUser] = useState({id:null, name:null, isAdmin: null});
  const [isLogged, setIsLogged] = useState(false);

  const unsetUser = () => {
    localStorage.clear();
    setIsLogged(false);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/b5/users/details`, {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('access') }`
          }
        });
        if(data.ok){
          const result  = await data.json();
          const {_id, firstName, isAdmin} = result.details;
          setUser({
            id: _id,
            name: firstName,
            isAdmin: isAdmin
          })
          setIsLogged(true);
        } else {
          setUser({
            id: null,
            name: null,
            isAdmin: null
          })
        }
     } catch (error) {
        console.log("Error")
     }
    }
   fetchUser();
  },[isLogged])

  return (
    <UserProvider value = {{user, setUser, unsetUser, isLogged}}>
      <Router>
        <Container fluid>
          <AppNavBar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/details/:id/:imgId" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} isLogged={isLogged}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
