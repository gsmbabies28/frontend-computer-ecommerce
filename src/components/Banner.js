
import {Col, Row, Button} from 'react-bootstrap';
import { CiShop } from "react-icons/ci";
import { NavLink } from 'react-router-dom';


export default function Banner({error}){

	const {title, content, destination, label} = error;

	return(
			<Row>
				<Col className="py-5 text-center home-text">
					<>
						<h1 className='text-light'>{title}</h1>
						<p className='text-light'>{content}</p>
						<NavLink to={destination}>
								<Button><span className='shop-icon'><CiShop /></span><span className='text-button'>{label}</span></Button>
						</NavLink>
					</>				
				</Col>
			</Row>	

	)
}