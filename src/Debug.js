import "./Debug.css"
import {useState} from "react";

function Debug(props) {
    const [is_active, setActive] = useState(true);
    return(
        <>
            {is_active ?
                <>
                    <div className="debug_notification">
                        <p className="close_icon" onClick={
                            () => {
                                setActive(false)
                            }
                        }>X</p>
                        <h3 className="debug_title">[DEBUG]</h3>
                        <br />
                            <pre className="debug_text">
                            {props.debug}
                        </pre>
                    </div>
                </>
                : null}
        </>
    );
}

export default Debug;
