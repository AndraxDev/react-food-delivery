import "./CartItem.css"
import {useState} from "react";
import {useCallback} from "react";

function removeItemFromCookies() {
    return (
        <>
        </>
    );
}

function CartItem(props) {
    const [is_active, makeActive] = useState(true);

    const clickHandle = useCallback(() => {
        props.setPriceState(props.totel - props.price)
    }, [props])

    return (
        <>
            {is_active ?
                <div className="cart_item">
                    <div>
                        <p className="remove_cart_item" onClick={
                            () => {
                                clickHandle();
                                makeActive(false);
                            }
                        }>X</p>
                        <p className="cart_item_title">{props.name}</p>
                        <p className="cart_item_price">{props.price}</p>
                    </div>
                </div>
                : removeItemFromCookies}
        </>
    );
}

export default CartItem;
