import { useState, useEffect } from "react";
import { Redirect } from "react-router";
function ChangePassword(props) {
    const token = props.match.params.token;
    const email = props.match.params.email;
    console.log(props.match.params);

    var backEndURL = "http://127.0.0.1:3502";
    const [state, setState] = useState({
        password: "",
        cpassword: "",
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const payload = {
            token: token,
        };

        fetch(backEndURL + "/users/passwordReset/" + email, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result) {
                    setAlertState({
                        ...alertState,
                        state: true,
                        message: res.status + " " + res.message,
                    });
                    setAlertState({
                        message: "URL Validation successful!",
                        state: true,
                    });
                    setShowForm(true);
                } else {
                    console.log("Res:");
                    setAlertState({
                        ...alertState,
                        state: false,
                        message: res.status + " " + res.message,
                    });
                }
            });
    }, []);

    const [alertState, setAlertState] = useState({
        message: "Validating URL....",
        state: false,
    });

    const [redirect, setRedirect] = useState({ state: false, url: "" });

    function handleOnChange(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(state);
    }

    function handleOnSubmit() {
        const payload = { password: state.password };
        if (state.password !== state.cpassword) {
            setAlertState({
                ...alertState,
                message: "Passwords Don't match",
                state: false,
            });
        } else {
            fetch(backEndURL + "/users/changePassword/" + email, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.result) {
                        setAlertState({
                            ...alertState,
                            state: true,
                            message: res.status + " " + res.message,
                        });

                        setTimeout(goHome, 3000);
                    } else {
                        console.log("Res:");
                        setAlertState({
                            ...alertState,
                            state: false,
                            message: res.message,
                        });
                    }
                });
        }
        console.log(payload);
    }

    function goRegisterPage() {
        setRedirect({
            ...redirect,
            state: !redirect.state,
            url: "/Register",
        });
    }

    function goLoginPage() {
        setRedirect({
            ...redirect,
            state: true,
            url: "/login",
        });
    }

    function goHome() {
        console.log("Go home");
        setRedirect({
            ...redirect,
            state: true,
            url: "/",
        });
    }

    if (redirect.state) {
        return <Redirect to={redirect.url} />;
    }

    if (!showForm) {
        return (
            <div className="col-md-6 offset-md-3 text-center p-3">
                <div
                    className={
                        alertState.state
                            ? "text-success h4 text-center"
                            : "text-danger h4 text-center"
                    }
                >
                    {alertState.message}
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-6 offset-md-3 text-center p-3">
            <div>
                <h1> Change Password </h1>
                <form className="text-left">
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="cpassword">Confirm Password</label>
                        <input
                            id="cpassword"
                            type="password"
                            name="cpassword"
                            className="form-control"
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleOnSubmit}
                        className="btn btn-primary btn-block"
                    >
                        Submit
                    </button>
                    <div className="row p-2">
                        <div className="col-6 col-xs-12 p-2">
                            <button
                                type="button"
                                className="btn btn-success btn-block"
                                onClick={() => goRegisterPage()}
                            >
                                Register
                            </button>
                        </div>
                        <div className="col-6 col-xs-12 p-2">
                            <button
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={goLoginPage}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div
                className={
                    alertState.state
                        ? "text-success h4 text-center"
                        : "text-danger h4 text-center"
                }
            >
                {alertState.message}
            </div>
        </div>
    );
}

export default ChangePassword;
