import Banner from '../components/Banner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Error(){
	const data = {
			title: "Page Not Found",
			content: "The page you are looking for cannot be found",
			destination: "/",
			label: "Go back to Homepage"
		}
		
	return (
			<>
				<div>
				 <Banner error={data}/>
				</div>

			<Row>
				<Col className="p-5 text-center">
					<img src="https://media1.tenor.com/m/WJ2FLjDnIN8AAAAd/confused-dog.gif" alt="Confused Dog" />
				</Col>
			</Row>	
			</>
		)
}