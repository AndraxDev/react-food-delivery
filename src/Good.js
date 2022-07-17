import Logo from './logo.svg'
import "./Good.css";
import Button from "@mui/material/Button";
import App from "./App";

function Good(props) {
    return (
        <div className="good_card">
            <Button variant="text" style={{width: "100%"}}>
                <img src={Logo} alt="logo" className="good_cover"/>
            </Button>
            <h3 className="good_name">{props.name}</h3>
            <p className="good_description">{props.description}</p>
            <div className="good_price">
                <Button variant="contained" style={{borderRadius: 50}} className="price_btn" onClick={
                    () => {

                    }
                }>{props.price} $</Button>
            </div>
        </div>
    );
}

export default Good;
