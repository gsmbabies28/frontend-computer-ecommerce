import { Table } from "react-bootstrap";

const OrderCard = ({order}) => {

    const {orderedOn, totalPrice, productsOrdered,userId} = order;
    const date = new Date(orderedOn)

    return (
             <Table striped bordered hover>
                    <thead>
                        <tr> 
                            <th  className="bg-secondary" colSpan={4}>
                                <div className="d-flex justify-content-between">
                                    <span>Ordered by: {userId.firstName}</span>Ordered on: { date.toLocaleDateString() }
                                </div>
                            </th>
                        </tr>
                        <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsOrdered?.map((item,i) => (
                            <tr key={i}>
                                <td>{item.productId.name}</td>
                                <td>{item.productId.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.subTotal}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}><strong>Total</strong></td>
                            <td className="fs-6"><em>{totalPrice}</em></td>
                        </tr>

                    </tbody>
                </Table>
    )
}

export default OrderCard