
import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
	return(
		<Row className="mt-3 mb-3 grid">
			<Col xs={12} md={4} >
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2> High End </h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2> Durable</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
					<Card.Body>
						<Card.Title>
							<h2> Quality </h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}