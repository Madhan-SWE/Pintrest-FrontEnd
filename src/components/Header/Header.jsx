import { Redirect } from "react-router";
import { useState } from "react";
import { connect } from "react-redux";


function Header(props) {

    const [redirect, setRedirect] = useState({ state: false, url:""});


    function goCreateBoardPage(){
        setRedirect({...redirect, state:true, url: "/createBoard"})
        console.log(redirect)
    }

    function goCreatePinPage(){
        console.log("Creating")
    }

    function logOut(){
        console.log("Log out")
    }
    
    function renderButton() {
        if (props.user.state) {
            return (
                <input type="button"
                    className="btn btn-outline-success my-2 my-sm-0"
                    onClick={logOut}
                    value="Logout"
                 />
            );
        }
    }
    
    function renderUser() {
        if (props.user.state) {
            return (
                <div className="m-2">
                    {props.user.email}
                </div>
            );
        }
    }

    function renderActions() {
        if (props.user.state) {
            return (
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-secondary dropdown-toggle m-2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Actions
                    </button>
                    <div class="dropdown-menu">
                    
                        <a class="dropdown-item" onClick={goCreateBoardPage}>
                            Create Board
                        </a>
                        <a class="dropdown-item" onClick={goCreatePinPage}>
                            Create Pin
                        </a>
                    
                    </div>
                </div>
            );
        }
    }
    
    if(redirect.state)
    {
        return(
            <Redirect to={redirect.url} />
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand text-danger h1" href="#">
                    PINTREST
                </a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Link
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">
                            Disabled
                        </a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                
                {renderActions()}
                {renderUser()}
                    {renderButton()}
                    
                </form>
            </div>
        </nav>
    );
}

export default connect(
    (currentState, props) => {
        return {
            user: currentState.user,
        };
    },
    (dispatch) => {
        return {};
    }
)(Header);
