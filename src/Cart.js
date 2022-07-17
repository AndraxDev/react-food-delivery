import "./Cart.css"

import CartItem from "./CartItem";
import {Divider, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';

function render_cart_items(setPrice, price, cart) {
    const items = [];

    // document.getElementById("cit").innerHTML = "";

    try {
        const goods = JSON.parse(cart);
        goods.forEach(elem => items.push(<CartItem name={`${elem.name}`} price={`${elem.price}`} gid={`${elem.id}`} amount={`${elem.amount}`} setPriceState={setPrice} total={price}/>));
    } catch (error) {}

    return (
        <>
            {items}
        </>
    );
}

function Cart() {
    const cookies = new Cookies();
    const [price, setPrice] = useState(0.0);
    let cart = JSON.stringify(cookies.get("cart"), null, 4);

    let p = 0;

    try {
        const goods = JSON.parse(cart);
        goods.forEach(elem => p += (parseFloat(elem.price) * parseFloat(elem.amount)));
        console.log(p);
    } catch (error) {}

    useEffect(() => {
        setPrice(p);
        // render_cart_items(setPrice, price, cart);
    }, [p]);

    console.log(cart);

    // useEffect(() => {
    //
    //     render_cart_items(setPrice, price, cart);
    //     console.log("PRICE CHANGED");
    //     console.log(cart);
    // }, [cart, price]);

    return (
        <>
            <div className="debug_area">
                {/*<Debug debug={cart}></Debug>*/}
            </div>
            <div className="cart_body">
                <div className="cart_background">
                    <h1 className="cart_title">Shopping cart</h1>
                    <div className="cart_s">
                        <div className="cart_left_section">
                            <iframe className="map"
                                    src="https://maps.google.com/maps?q=Popradsk%C3%A1%2092,%20040%2001%20Ko%C5%A1ice&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                            <div className="form">
                                <div className="field_frame"><TextField id="outlined-basic" label="Name" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="outlined-basic" label="Email" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="outlined-basic" label="Phone" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="outlined-basic" label="Address" variant="outlined" className="field"/></div>
                            </div>
                        </div>

                        <div className="cart_right_section">
                            <div className="cc">
                                {cookies.get("cart") === "" || price === 0 ? <h2>Cart is empty</h2> : null}
                                <div id="cit">
                                    {render_cart_items(setPrice, price, cart)}
                                </div>
                            </div>
                            <div className="cart_summarizing">
                                <b className="sum">Total: {price} $</b>
                                <Button variant="contained" style={{borderRadius: 50}} className="pay_btn" onClick={
                                    () => {

                                    }
                                }>Place order</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
