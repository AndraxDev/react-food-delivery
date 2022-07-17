import "./LoadingScreen.css"
import CircularProgress from "@mui/material/CircularProgress"

function LoadingScreen(props) {
    return(
        <div className="loading_screen_bg">
            {/*<h1>Loading...</h1>*/}
            <CircularProgress className="loading_progress"/>
        </div>
    );
}

export default LoadingScreen
