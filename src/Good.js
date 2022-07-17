import Logo from './logo.svg'
import "./Good.css";
import Button from "@mui/material/Button";
import Cookies from 'universal-cookie';

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
                        const cookies = new Cookies();
                        let cart = cookies.get("cart");
                        let d = JSON.stringify(cart)
                        console.log(d);
                        // cookies.set("shop", , { path: '/' });/
                        try {
                            let js = JSON.parse(d);

                            let is_found = false;

                            js.forEach(elem => {
                                if (props.gid === elem.id) {
                                    elem.amount += 1;
                                    is_found = true;
                                }
                            });

                            if (!is_found) {
                                js.push(
                                    {
                                        name: props.name,
                                        price: props.price,
                                        id: props.gid,
                                        amount: 1
                                    }
                                )
                            }

                            let cookie_set = JSON.stringify(js);
                            cookies.set("cart", cookie_set, { path: '/' });
                        } catch (error) {
                            let js = [];
                            js.push(
                                {
                                    name: props.name,
                                    price: props.price,
                                    id: props.gid,
                                    amount: 1
                                }
                            )

                            let cookie_set = JSON.stringify(js);
                            cookies.set("cart", cookie_set, { path: '/' });
                        }

                        console.log(cookies.get("cart"));
                    }
                }>{props.price} $</Button>
            </div>
        </div>
    );
}

export default Good;
