import { Card, } from "react-bootstrap"
import { Link } from "react-router-dom"
import { MdShoppingCartCheckout } from "react-icons/md";

export default function ProductCard({product,id}){

	return (
		<div className="col-sm d-flex align-items-center justify-content-center p-2">
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" className="img-fluid" src={`https://picsum.photos/id/${id}/200/300`} />
				<Card.Body>
					<Card.Title><h6>{product.name}</h6></Card.Title>
					<Card.Text><span>{product.description}</span></Card.Text>
					<Card.Text className="price">₱ {product.price}</Card.Text>
					<Link variant="primary" to={`/products/details/${product._id}/${id}`}><MdShoppingCartCheckout className="fs-2"/></Link>
				</Card.Body>
			</Card>
		</div>
	)
}