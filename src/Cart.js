import "./Cart.css"

import CartItem from "./CartItem";
import {Divider} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";

let total_price = 0;

function render_cart_items(setPrice, price) {
    const items = [];

    for (let i = 0; i < 10; i++) {
        items.push(<CartItem name="Lorem ipsum" price={`${i + 1}`} setPriceState={setPrice} totel={price}/>);
    }

    return (
        <>
            {items}
        </>
    );
}

function Cart() {
    const [price, setPrice] = useState(55);
    return (
        <div className="cart_body">
            <div className="cart_background">
                <div className="cc">
                    <h1 className="cart_title">Shopping cart</h1>
                    <div>
                        {render_cart_items(setPrice, price)}
                    </div>
                    <div className="cart_summarizing">
                        <p className="sum">Delivery: </p>
                        <p className="sum">Taxes: </p>
                        <p className="sum">Subtotal: </p>
                        <Divider></Divider>
                        <b className="sum">Total: {price}</b>
                        <Button variant="contained" style={{borderRadius: 50}} className="pay_btn" onClick={
                            () => {

                            }
                        }>Create order</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
