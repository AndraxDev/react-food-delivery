import "./Cart.css"

import CartItem from "./CartItem";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import {Navigate} from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function HomeRedirector() {
    return (
        <Navigate to="/" replace={false} />
    );
}

function render_cart_items(setPrice, price, cart, setError) {
    const items = [];

    try {
        const goods = JSON.parse(cart);
        goods.forEach(elem => items.push(<CartItem name={`${elem.name}`} setErrorState={setError} photo={`${elem.photo}`} price={`${elem.price}`} gid={`${elem.id}`} amount={`${elem.amount}`} setPriceState={setPrice} total={price}/>));
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
    const [error, setError] = useState(true);
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [stateName, setStateName] = useState("");
    const [stateEmail, setStateEmail] = useState("");
    const [statePhone, setStatePhone] = useState("");
    const [stateAddress, setStateAddress] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openSuccessConfirmed, setOpenSuccessConfirmed] = useState(false);
    const [openFailed, setOpenFailed] = useState(false);
    const [openFailedConfirmed, setOpenFailedConfirmed] = useState(false);
    const [onOrderPlaced, setOrderPlaced] = useState(false);
    const [iitems, setIItems] = useState([]);
    const [ierror, setIError] = useState(null);
    const [isILoaded, setIsILoaded] = useState(false);

    useEffect(() => {
        if (onOrderPlaced) {
            console.log("ORDER PLACED")
            const cookies = new Cookies();
            let current_shop = cookies.get("shop").toString();
            let cart_items = cookies.get("cart");
            let name = stateName;
            let email = stateEmail;
            let phone = statePhone;
            let address = stateAddress;
            let timestamp = Date.now();
            let object = {
                shop: current_shop,
                cart: cart_items,
                name: name,
                email: email,
                phone: phone,
                address: address,
                timestamp: timestamp
            }

            cookies.set("shop", "");
            cookies.set("cart", "");

            let api_string = encodeURIComponent(JSON.stringify(object));
            console.log(api_string);

            fetch("https://sandbox.teslasoft.org/test/react/api/v1/PlaceOrder.php?ak=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYzQzMzUyNC04ZTBiLTQ4NjItOWE1Mi1hNmE4MDBmMzYxODMiLCJwZXJtaXNzaW9ucyI6W3sibmFtZSI6IlFVRVJZX0FMTF9TSE9QUyJ9LHsibmFtZSI6IlFVRVJZX0FMTF9HT0RTIn0seyJuYW1lIjoiVVNFX0ZJTFRFUlMifV19.2j79llRQP_eudUFVJJ5xcjsQjCpVw_TXPDvgmGGtvp8&order=" + api_string)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsILoaded(true);
                        setIItems(result);
                        handleClickOpenSuccess();
                        console.log(JSON.stringify(result));
                    },
                    (error) => {
                        setIsILoaded(true);
                        setIError(error);
                    }
                )
        }
    }, [onOrderPlaced])

    const handleClickOpenSuccess = () => {
        setOpenSuccess(true);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    const handleCloseSuccessCanceled = () => {
        setOpenSuccess(false);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    const handleCloseSuccessConfirmed = () => {
        setOpenSuccess(false);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    const handleClickOpenFailed = () => {
        setOpenFailed(true);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    const handleCloseFailedCanceled = () => {
        setOpenFailed(false);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    const handleCloseFailedConfirmed = () => {
        setOpenFailed(false);
        setOrderPlaced(false);
        setIsILoaded(false);
    };

    let cart = JSON.stringify(cookies.get("cart"), null, 4);

    let p = 0;

    try {
        const goods = JSON.parse(cart);
        goods.forEach(elem => p += (parseFloat(elem.price) * parseFloat(elem.amount)));
        console.log(p);
    } catch (error) {}

    if (p === 0) {
        const cookies = new Cookies();
        cookies.set("shop", "");
        setError(true);
    }

    useEffect(() => {
        setPrice(p);
    }, [p]);

    useEffect(() => {
        console.log("Error state: " + error);
    }, [error]);

    console.log(cart);
    const validateInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setErrorName(true);
            setError(true);
            console.log("Error state: " + error);
        } else {
            setErrorName(false);
            setStateName(event.target.value);
            if (!errorName && !errorEmail && !errorPhone && !errorAddress) {
                setError(false);
            }
            console.log("Error state: " + error);
        }
    }

    const validateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setErrorEmail(true);
            setError(true);
            console.log("Error state: " + error);
        } else {
            setErrorEmail(false);
            setStateEmail(event.target.value);
            if (!errorName && !errorEmail && !errorPhone && !errorAddress) {
                setError(false);
            }
            console.log("Error state: " + error);
        }
    }

    const validateInputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setErrorPhone(true);
            setError(true);
            console.log("Error state: " + error);
        } else {
            setErrorPhone(false);
            setStatePhone(event.target.value);
            if (!errorName && !errorEmail && !errorPhone && !errorAddress) {
                setError(false);
            }
            console.log("Error state: " + error);
        }
    }

    const validateInputAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setErrorAddress(true);
            setError(true);
            console.log("Error state: " + error);
        } else {
            setErrorAddress(false);
            setStateAddress(event.target.value);
            if (!errorName && !errorEmail && !errorPhone && !errorAddress) {
                setError(false);
            }
            console.log("Error state: " + error);
        }
    }

    return (
        <>
            {onOrderPlaced && !isILoaded ?<LoadingScreen /> : null}
            <div className="debug_area">
                {/*<Debug debug={cart}></Debug>*/}
            </div>
            <div className="cart_body">
                <Dialog
                    open={openSuccess}
                    onClose={setOpenSuccess}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Order"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Order has been placed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccessCanceled}>Close</Button>
                        <Button onClick={
                            () => {
                                setOpenSuccessConfirmed(true);
                                handleCloseSuccessConfirmed();
                            }
                        } autoFocus>
                            Go to homepage
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
                        {"Error"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please check your input
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={
                            () => {
                                setOpenFailedConfirmed(true);
                                handleCloseFailedConfirmed();
                            }
                        } autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="cart_background">
                    <h1 className="cart_title">Shopping cart</h1>
                    <div className="cart_s">
                        <div className="cart_left_section">
                            <iframe className="map" title="map"
                                    src="https://maps.google.com/maps?q=Popradsk%C3%A1%2092,%20040%2001%20Ko%C5%A1ice&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                            <div className="form">
                                <div className="field_frame"><TextField id="name" error={errorName} helperText={errorName ? "Please fill out this blank": ""} onChange={validateInputName} label="Name" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="email" error={errorEmail} helperText={errorEmail ? "Please fill out this blank": ""} onChange={validateInputEmail} label="Email" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="phone" error={errorPhone} helperText={errorPhone ? "Please fill out this blank": ""} onChange={validateInputPhone} label="Phone" variant="outlined" className="field"/></div>
                                <div className="field_frame"><TextField id="address" error={errorAddress} helperText={errorAddress ? "Please fill out this blank": ""} onChange={validateInputAddress} label="Address" variant="outlined" className="field"/></div>
                            </div>
                        </div>

                        <div className="cart_right_section">
                            <div className="cc">
                                {cookies.get("cart") === "" || price === 0 ? <h2>Cart is empty</h2> : null}
                                <div id="cit">
                                    {render_cart_items(setPrice, price, cart, setError)}
                                </div>
                            </div>
                            <div className="cart_summarizing">
                                <b className="sum">Total: {price} $</b>
                                <Button variant="contained" style={{borderRadius: 50}} className="pay_btn" onClick={
                                    () => {
                                        if (error) {
                                            handleClickOpenFailed();
                                        } else {
                                            setOrderPlaced(true);
                                        }
                                    }
                                }>Place order</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openSuccessConfirmed ? <HomeRedirector/> : null}
        </>
    );
}

export default Cart;
