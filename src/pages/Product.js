import AdminView from '../components/AdminView'
import UserContext from "../UserContext";
import { useContext } from 'react';
import UserView from '../components/UserView';

const Product = () => {
  const {user}= useContext(UserContext);
  const{isAdmin} = user
  return (
	<>
		{isAdmin ? (<AdminView />) :(<UserView />)}
	</>
  )
}

export default Product