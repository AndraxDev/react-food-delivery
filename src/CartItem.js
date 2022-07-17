import "./CartItem.css"
import {useState} from "react";
import {useCallback} from "react";
import Cookies from "universal-cookie";
import {TextField} from "@mui/material";
import Logo from './logo.svg'
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

    const clickHandle = useCallback(() => {
        props.setPriceState(props.total - props.price)
    }, [props])

    return (
        <>
            {is_active ?
                <div className="cart_item">
                    <div className="ccc">
                        <div className="clp">
                            <Button variant="text" style={{width: "100%"}}>
                                <img src={Logo} alt="logo" className="good_cover"/>
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
                                <TextField id="outlined-basic" value={props.amount} label="Amount" variant="outlined" type="number" size="small" className="amount_selector"/>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    );
}

export default CartItem;
