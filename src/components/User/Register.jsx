import { useState } from "react";

function Register() {

    const [state, setState] = useState({
        email: "",
        fullname:"",
        password: ""
    })

    function handleOnChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        console.log(state);
    }

    function handleOnSubmit() {
        const payload = {
            ...state
        }
        console.log(payload);
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
                        className="form-control"
                        onChange={(e)=>handleOnChange(e)}
                    />
                </div>
                <button type="button" class="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
}

export default Register;
