import { useState } from "react";
import { Redirect } from "react-router";

function ForgotPassword(props) {

   
    var backEndURL = "http://127.0.0.1:3502"
    const [state, setState] = useState({
        email: ""
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

        fetch(backEndURL + "/users/forgotPassword/" + payload.email, {}).then(res=>res.json())
        .then(res => {
            if(res.result)
            {
                setAlertState({
                    ...alertState,
                    state: true,
                    message: res.status + " " + res.message
                })
               
                setTimeout(goHome, 3000);

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

    function goLoginPage(){
        setRedirect({
            ...redirect,
            state: true,
            url: "/login"
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
    

    return (
        <div className="col-md-6 offset-md-3 text-center">
            <h1> Reset Password </h1>
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
                
                <button type="button" onClick={handleOnSubmit} className="btn btn-primary btn-block">Get Reset Link</button>
                <div className="row p-2">
                    <div className="col-6 col-xs-12 p-2">
                    <button type="button" className="btn btn-success btn-block" onClick={()=> goRegisterPage()}
                    >Register</button>
                    </div>
                    <div className="col-6 col-xs-12 p-2">
                    <button type="button" className="btn btn-danger btn-block" onClick={goLoginPage}>Login</button>
                    </div>
                </div>
                <div className={alertState.state?"text-success h4 text-center": "text-danger h4 text-center"}>{alertState.message}</div>
            </form>
        </div>
    );
}

export default ForgotPassword;
