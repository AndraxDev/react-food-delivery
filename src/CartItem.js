import "./CartItem.css"
import {useEffect, useState} from "react";
import {useCallback} from "react";
import Cookies from "universal-cookie";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

function removeItemFromCookies(gid) {
    console.log(gid);
    const cookies = new Cookies();

    let cart = JSON.stringify(cookies.get("cart"));

    const goods = JSON.parse(cart);

    let js = [];

    goods.forEach(elem => {
        if (gid !== elem.id) {
            js.push(
                {
                    name: elem.name,
                    price: elem.price,
                    id: elem.id,
                    photo: elem.photo,
                    amount: elem.amount
                }
            )
        }
    });

    let cookie_set = JSON.stringify(js);
    console.log("COOKIE SET");
    console.log(cart);
    cookies.set("cart", cookie_set, { path: '/' });
}

function CartItem(props) {
    const [is_active, makeActive] = useState(true);
    const [amount, setAmount] = useState(1);
    const [error, setError] = useState(false);

    const clickHandle = useCallback(() => {
        props.setPriceState(props.total - props.price * amount);
    }, [props])

    useEffect(() => {
        console.log("[CART SERVICE] Amount: " + amount);
    }, [amount]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) < 1) {
            setError(true);
            props.setErrorState(true);
        } else {
            if (amount > parseInt(event.target.value)) {
                props.setPriceState(props.total + props.price);
            } else {
                props.setPriceState(props.total - props.price);
            }

            setAmount(parseInt(event.target.value));
            setError(false);
            props.setErrorState(false);

            const cookies = new Cookies();

            let cart = JSON.stringify(cookies.get("cart"));

            const goods = JSON.parse(cart);

            let js = [];

            goods.forEach(elem => {
                if (props.gid === elem.id) {
                    js.push(
                        {
                            name: elem.name,
                            price: elem.price,
                            id: elem.id,
                            photo: elem.photo,
                            amount: parseInt(event.target.value)
                        }
                    )
                } else {
                    js.push(
                        {
                            name: elem.name,
                            price: elem.price,
                            id: elem.id,
                            photo: elem.photo,
                            amount: elem.amount
                        }
                    )
                }
            });

            let cookie_set = JSON.stringify(js);
            console.log("COOKIE SET");
            console.log(cookie_set);
            cookies.set("cart", cookie_set, { path: '/' });
        }
    };

    return (
        <>
            {is_active ?
                <div className="cart_item">
                    <div className="ccc">
                        <div className="clp">
                            <Button variant="text" style={{width: "100%"}}>
                                <img src={props.photo} alt="photo" className="good_cover"/>
                            </Button>
                        </div>
                        <div className="crp">
                            <p className="remove_cart_item" onClick={
                                () => {
                                    removeItemFromCookies(props.gid)
                                    clickHandle();
                                    makeActive(false);
                                }
                            }>X</p>

                            <p className="cart_item_title">{props.name}</p>
                            <p className="cart_item_price">Price: {props.price} $</p>
                            <div className="field_amount_frame">
                                <TextField error={error} helperText={error ? "Incorrect amount": ""} id="amount" defaultValue={props.amount} onChange={handleChange} label="Amount" variant="outlined" type="number" size="small" className="amount_selector" />
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    );
}

export default CartItem;
