import { connect } from "react-redux";
import { Redirect } from "react-router";
import CreateBoard from "../Operations/CreateBoard"
import CreatePin from "../Operations/CreatePin"

function Home(props) {

    if(!props.user.state)
    {
        return(
            <Redirect to="/login" />
        )
    }
    
    if(props.operations==="DASHBOARD")
    {
        return(
            <CreatePin />
        )
    }
    else if(props.operations === "CREATE_PIN")
    {

    }
    else if(props.operations === "CREATE_BOARD")
    {

    }
}

export default connect(
    (currentState, props)=>{
        return {
            user: currentState.user,
            operations: currentState.operations
        };
    },
    (dispatch) => {
        return {};
    }
)(Home);