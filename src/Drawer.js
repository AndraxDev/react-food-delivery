import "./Drawer.css";

function Drawer(props) {



    return (
        <div className="drawer">
            <div className="drawer_bg" id="drawer">
                <h2 className="drawer_title">Shops</h2>
                {props.shops}
            </div>
        </div>
    );
}

export default Drawer;
