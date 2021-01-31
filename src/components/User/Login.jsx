import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as userActions from "../Actions/userActions";

function Login(props) {

   
    var backEndURL = "http://127.0.0.1:3502"
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    
    const [alertState, setAlertState] = useState({
        message: "",
        state: false
    });
    
    const [redirect, setRedirect] = useState({ state: false, url:""});

    function handleOnChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(state);
    }

    function handleOnSubmit() {
        const payload = {
            ...state
        }
        console.log(payload);

        fetch(backEndURL + "/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(res => {
            if(res.result)
            {
                console.log(" - - User Login successfull !");
                console.log(props.user.state)
                props.loginUser(res.token, state.email)
                setAlertState({
                    ...alertState,
                    state: true,
                    message: res.message
                })
                console.log(props.user.state)

            }
            else{
                console.log("Res:")
                setAlertState({
                    ...alertState,
                    state: false,
                    message: res.message
                })
            }
        })

    }

    function goRegisterPage(){
        setRedirect({
            ...redirect,
            state: !redirect.state,
            url: "/Register"
        })
    }

    function goForgotPasswordPage(){
        setRedirect({
            ...redirect,
            state: true,
            url: "/ForgotPassword"
        })
    }

    function goHome(){
        console.log("Go home")
        setRedirect({
            ...redirect,
            state: true,
            url: "/"
        })
    }
    
    if(redirect.state)
    {
        return (
            <Redirect to={redirect.url} />
        )
    }
    
    if(props.user.state)
    {
        console.log("Token from state: ", props.user.token)
        sessionStorage.setItem("jwt-token", props.user.token)
        setTimeout(goHome, 1000);
    }
    
    return (
        <div className="col-md-6 offset-md-3 text-center">
            <h1> Login </h1>
            <form className="text-left">
                <div className="form-group">
                    <label for="emailId">Email address</label>
                    <input
                        id="emailId"
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(e)=>handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={(e)=>handleOnChange(e)}
                    />
                </div>
                <button type="button" onClick={handleOnSubmit} className="btn btn-primary btn-block">Login</button>
                <div className="row p-2">
                    <div className="col-6 col-xs-12 p-2">
                    <button type="button" className="btn btn-success btn-block" onClick={()=> goRegisterPage()}
                    >Register</button>
                    </div>
                    <div className="col-6 col-xs-12 p-2">
                    <button type="button" className="btn btn-danger btn-block" onClick={goForgotPasswordPage}>Reset Password</button>
                    </div>
                </div>
                <div className={alertState.state?"text-success h4 text-center": "text-danger h4 text-center"}>{alertState.message}</div>
            </form>
        </div>
    );
}

export default connect(
    (currentState, props)=>{
        return {
            user: currentState.user
        };
    },
    (dispatch) => {
        return {
            loginUser: (token, email) => dispatch(userActions.loginUser(token, email))
        };
    }
)(Login);
