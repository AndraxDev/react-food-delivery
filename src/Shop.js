import "./Shop.css";
import Button from "@mui/material/Button";
import {useCallback} from "react";

function Shop(props) {

    const clickHandle = useCallback(() => {
        props.stateChanged(props.sid)
    }, [props])

    return (
        <div>
            <Button variant="text" className="shop_item" style={{borderRadius: 50}} onClick={clickHandle}>
                <img src={props.icon} alt="logo" className="shop_item_icon"/>
                <p className="shop_item_text">{props.name}</p>
            </Button>
        </div>
    );
}

export default Shop;
