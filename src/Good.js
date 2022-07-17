import Logo from './logo.svg'
import "./Good.css";
import Button from "@mui/material/Button";
import Cookies from 'universal-cookie';
import {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Redirect} from "react-router-dom";
import { Navigate } from "react-router-dom";


function CartRedirector() {
    return (
        <Navigate to="/cart" replace={false} />
    );
}

function Good(props) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openSuccessConfirmed, setOpenSuccessConfirmed] = useState(false);

    const [openFailed, setOpenFailed] = useState(false);
    const [openFailedConfirmed, setOpenFailedConfirmed] = useState(false);

    const handleClickOpenSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccessCanceled = () => {
        setOpenSuccess(false);
    };

    const handleCloseSuccessConfirmed = () => {
        setOpenSuccess(false);
    };

    const handleClickOpenFailed = () => {
        setOpenFailed(true);
    };

    const handleCloseFailedCanceled = () => {
        setOpenFailed(false);
    };

    const handleCloseFailedConfirmed = () => {
        setOpenFailed(false);
    };

    return (
        <div className="good_card">
            <Button variant="text" style={{width: "100%"}}>
                <img src={props.photo} alt="photo" className="good_cover"/>
            </Button>
            <Dialog
                open={openSuccess}
                onClose={setOpenSuccess}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cart"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Item has been added to cart
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessCanceled}>Continue shopping</Button>
                    <Button onClick={
                        () => {
                            setOpenSuccessConfirmed(true);
                            handleCloseSuccessConfirmed();
                        }
                    } autoFocus>
                        View cart
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openFailed}
                onClose={setOpenFailed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Failed to add some items"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have items of another shop in your cart. please empty your cart or complete you order to use this shop.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFailedCanceled}>Close</Button>
                    <Button onClick={
                        () => {
                            setOpenFailedConfirmed(true);
                            handleCloseFailedConfirmed();
                        }
                    } autoFocus>
                        View cart
                    </Button>
                </DialogActions>
            </Dialog>

            <h3 className="good_name">{props.name}</h3>
            <p className="good_description">{props.description}</p>
            <div className="good_price">
                <Button variant="contained" style={{borderRadius: 50}} className="price_btn" onClick={
                    () => {
                        const cookies = new Cookies();
                        let current_shop = cookies.get("shop").toString();
                        if (current_shop === "" || current_shop === props.shop) {
                            let cart = cookies.get("cart");
                            let d = JSON.stringify(cart)
                            console.log(d);
                            cookies.set("shop", props.shop);
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
                                            photo: props.photo,
                                            id: props.gid,
                                            amount: 1
                                        }
                                    )
                                }

                                let cookie_set = JSON.stringify(js);
                                cookies.set("cart", cookie_set, {path: '/'});
                            } catch (error) {
                                let js = [];
                                js.push(
                                    {
                                        name: props.name,
                                        price: props.price,
                                        photo: props.photo,
                                        id: props.gid,
                                        amount: 1
                                    }
                                )

                                let cookie_set = JSON.stringify(js);
                                cookies.set("cart", cookie_set, {path: '/'});
                            }

                            console.log(cookies.get("cart"));
                            handleClickOpenSuccess();
                        } else {
                            handleClickOpenFailed();
                        }
                    }
                }>{props.price} $</Button>
            </div>
            {openSuccessConfirmed || openFailedConfirmed ? <CartRedirector/> : null}
        </div>
    );
}

export default Good;
