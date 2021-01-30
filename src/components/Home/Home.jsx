import { connect } from "react-redux";
import { Redirect } from "react-router";
function Home(props) {
    console.log(props.user)
    if (! props.user){
        return (
            <Redirect to="/login" />
            
        )
    }

    return(
        <div>
            Hello 
        </div>
    )
}

export default connect(
    (currentState, props)=>{
        return {
            user: currentState.user
        };
    },
    (dispatch) => {
        return {};
    }
)(Home);