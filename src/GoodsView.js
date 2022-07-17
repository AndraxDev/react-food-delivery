import Good from "./Good";
import "./GoodsView.css";

function GoodsView(props) {
    return (
        <div className="merchant_view">
            <div className="merchant_bg">
                <div className="c" id="goods">
                    {props.goods}
                </div>
            </div>
        </div>
    );
}

export default GoodsView;
