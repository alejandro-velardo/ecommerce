import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import GlobalContext from "../context/GlobalContext"
import { Button } from 'react-bootstrap'




function TotalCheckout() {
    const { cart, setCart, proceedToCheckout } = useContext(GlobalContext)


    var total = 0

    for (let article of cart) {
        total = total + (article.quantity * article.price)
    }

    const bannerStyle = {
        display: "flex",
        alignItems: "center", // align items center vertically
        justifyContent: "center", // align content center horizontally
        height: "10vh" // set height to fill viewport
    }

    return (
        <div className='checkout-banner'>
            <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item style={bannerStyle}>
                        <h2>Total: {total}€</h2>
                    </ListGroup.Item>
                    <ListGroup.Item style={bannerStyle}>
                        <Button variant="outline-success" onClick={proceedToCheckout}>Proceed to checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>

    );
}

export default TotalCheckout;