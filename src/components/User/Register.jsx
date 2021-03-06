import { useState, useEffect } from "react";
import { Redirect } from "react-router";

function Register() {

    var backEndURL = "http://127.0.0.1:3502"
    const [state, setState] = useState({
        email: "",
        fullname:"",
        password: ""
    })
    
    const [alertState, setAlertState] = useState({
        message: "",
        state: false
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(alertState.state)
        {
            setTimeout(()=>setRedirect(true), 1000);
        }
    }, [alertState])

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

        fetch(backEndURL + "/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(res => {
            if(res.result)
            {
                console.log("User registration successfull !");
                setAlertState({
                    ...alertState,
                    state: true,
                    message: res.message
                })

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

    if(redirect)
    {
        return(
            <Redirect to="/login" />
        )
    }
    return (
        <div className="col-md-6 offset-md-3 text-center">
            <h1> Register User </h1>
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
                    <label for="fullname">Full name</label>
                    <input
                        id="fullname"
                        type="text"
                        name="fullname"
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
                <button type="button" onClick={handleOnSubmit} className="btn btn-primary btn-block">Submit</button>
                <div className={alertState.state?"text-success h4 text-center": "text-danger h4 text-center"}>{alertState.message}</div>
            </form>
        </div>
    );
}

export default Register;
