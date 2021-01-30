import { useState, useEffect } from "react";
import { Redirect } from "react-router";

function ActivateUser(props) {
    var backEndURL = "http://127.0.0.1:3502";

    const [alertState, setAlertState] = useState({
        message: "",
        state: false,
    });

    const [redirect, setRedirect] = useState(false);

    console.log(props.match.params.token);
    const token = props.match.params.token;

    useEffect(() => {
        fetch(backEndURL + "/users/active/" + token)
            .then((res) => res.json())
            .then((res) => {
                setAlertState({
                    ...alertState,
                    state: res.result,
                    message: res.status + " " + res.message,
                });
            });
    }, []);

    useEffect(() => {
        if (alertState.state) {
            setTimeout(() => setRedirect(true), 1000);
        }
    }, [alertState]);

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div
            className={
                alertState.state
                    ? "text-success h4 text-center"
                    : "text-danger h4 text-center"
            }
        >
            {alertState.message}
        </div>
    );
}

export default ActivateUser;
