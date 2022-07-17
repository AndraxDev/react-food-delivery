import React, {useEffect, useState} from "react";
import logo from './logo-brand.png'
import react_icon from './logo.svg'
import './App.css';
import Drawer from './Drawer';
import GoodsView from "./GoodsView";
import Shop from "./Shop";
import Good from "./Good";
import Debug from "./Debug";
import LoadingScreen from "./LoadingScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";

function render_drawer(shops, state) {
    const data = [];

    shops.forEach(elem => data.push(<Shop icon={react_icon} name={`${elem.name}`} sid={`${elem.id}`} stateChanged={state}></Shop>));

    return(
        <>
            {data}
        </>
    );
}

function render_goods(goods) {
    const data = [];

    goods.forEach(elem => data.push(<Good icon={react_icon} name={`${elem.name}`} description={`${elem.description}`} price={`${elem.price}`} gid={`${elem.id}`}></Good>));

    return(
        <>
            {data}
        </>
    );
}

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [tstate, setTState] = useState("5e82d24d-7a38-43a4-9a20-8e18012b3c3f");

    const [merror, setMError] = useState(null);
    const [isMLoaded, setIsMLoaded] = useState(false);
    const [mitems, setMItems] = useState([]);

    useEffect(() => {
        fetch("https://sandbox.teslasoft.org/test/react/api/v1/DatabaseHandler.php?ak=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYzQzMzUyNC04ZTBiLTQ4NjItOWE1Mi1hNmE4MDBmMzYxODMiLCJwZXJtaXNzaW9ucyI6W3sibmFtZSI6IlFVRVJZX0FMTF9TSE9QUyJ9LHsibmFtZSI6IlFVRVJZX0FMTF9HT0RTIn0seyJuYW1lIjoiVVNFX0ZJTFRFUlMifV19.2j79llRQP_eudUFVJJ5xcjsQjCpVw_TXPDvgmGGtvp8&criteria=shops&as=false")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        fetch("https://sandbox.teslasoft.org/test/react/api/v1/DatabaseHandler.php?ak=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYzQzMzUyNC04ZTBiLTQ4NjItOWE1Mi1hNmE4MDBmMzYxODMiLCJwZXJtaXNzaW9ucyI6W3sibmFtZSI6IlFVRVJZX0FMTF9TSE9QUyJ9LHsibmFtZSI6IlFVRVJZX0FMTF9HT0RTIn0seyJuYW1lIjoiVVNFX0ZJTFRFUlMifV19.2j79llRQP_eudUFVJJ5xcjsQjCpVw_TXPDvgmGGtvp8&criteria=goods&sid=" + tstate + "&as=false")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsMLoaded(true);
                    setMItems(result);
                },
                (error) => {
                    setIsMLoaded(true);
                    setMError(error);
                }
            )
    }, [tstate])

    if (error) {
        console.log("[API CONNECTOR] Failed to load API")
        return (
            <div className="App">
                <Debug debug="Failed to load API"></Debug>
            </div>
        )
    } else {
        console.log("[API CONNECTOR] API loaded")
        if (items.shops === undefined) {
            console.log("[API CONNECTOR] Internal error")
            return (
                <div className="App">
                    {/*<Debug debug="An internal error occurred while loading API: Undefined state 'items'."></Debug>*/}
                    {isLoaded ? null : <LoadingScreen />}
                </div>
            )
        } else {
            return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={
                                <div className="App">
                                    <header className="nav-bar">
                                        <img src={logo} className="brand-logo" alt="logo"/>
                                    </header>
                                    <div className="content">
                                        <div className="debug_area">
                                            {/*<Debug debug={JSON.stringify(items, null, 4)}></Debug>*/}
                                            {/*<Debug debug={JSON.stringify(items.shops, null, 4)}></Debug>*/}
                                            {/*<Debug debug={tstate}></Debug>*/}
                                        </div>
                                        <Drawer shops={render_drawer(items.shops, setTState)} stateChanged={setTState}/>
                                        {isMLoaded ? <GoodsView goods={render_goods(mitems)} /> : null}
                                    </div>
                                </div>
                            } />
                            <Route path="cart" element={
                                <div className="App">
                                    <header className="nav-bar">
                                        <img src={logo} className="brand-logo" alt="logo"/>
                                    </header>
                                    <div className="content">
                                        <div className="debug_area">
                                            {/*<Debug debug={JSON.stringify(items, null, 4)}></Debug>*/}
                                            {/*<Debug debug={JSON.stringify(items.shops, null, 4)}></Debug>*/}
                                            {/*<Debug debug={tstate}></Debug>*/}
                                        </div>
                                        <div className="body">
                                            <Cart />
                                        </div>
                                    </div>
                                </div>
                            } />
                            <Route path="order" element={
                                <>
                                    <h1>Order</h1>
                                </>
                            } />
                            <Route path="*" element={
                                <>
                                    <h1>404</h1>
                                    <p>Not found</p>
                                </>
                            } />
                        </Route>
                    </Routes>
                </BrowserRouter>
            );
        }
    }
}

export default App;
