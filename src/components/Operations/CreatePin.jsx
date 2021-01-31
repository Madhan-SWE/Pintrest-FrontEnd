import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

function CreatePin(props) {
    var backEndURL = "http://127.0.0.1:3502";
    const [state, setState] = useState({
        pinname: "",
        url: "",
        description: "",
        boardname: ""
    });
    
    const [boardNames, setBoardNames] = useState([1, 2]);
    console.log(boardNames)
    const [alertState, setAlertState] = useState({
        message: "",
        state: false,
    });

    // const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(backEndURL + "/boards/" + props.user.email,{
            method: "POST",
            body: "{}",
            headers: {
                "Content-Type": "application/json",
                authorization: props.user.token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res.length===0)
                {
                    setBoardNames(["No boards found !"])
                }
                else{
                    setBoardNames(res.data)
                }
                
            });
    }, []);

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
        const payload = {
            ...state,
            email: props.user.email,
        };
        console.log(payload);
        console.log(props.user.token);

        // fetch(backEndURL + "/boards", {
        //     method: "POST",
        //     body: JSON.stringify(payload),
        //     headers: {
        //         "Content-Type": "application/json",
        //         authorization: props.user.token,
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         if (res.result) {
        //             setAlertState({
        //                 ...alertState,
        //                 state: true,
        //                 message: res.message,
        //             });
        //         } else {
        //             console.log("Res:");
        //             setAlertState({
        //                 ...alertState,
        //                 state: false,
        //                 message: res.message,
        //             });
        //         }
        //     });
    }

    // if(redirect)
    // {
    //     return(
    //         <Redirect to="/login" />
    //     )
    // }
    return (
        <div className="col-md-6 offset-md-3 text-center">
            <h1> Create Pin </h1>
            <form className="text-left">
                <div className="form-group">
                    <label for="pinname">Pin name</label>
                    <input
                        id="pinname"
                        type="text"
                        name="pinname"
                        className="form-control"
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="url">URL</label>
                    <input
                        id="url"
                        type="text"
                        name="url"
                        className="form-control"
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="file">File</label>
                    <input
                        id="file"
                        type="file"
                        name="file"
                        className="form-control"
                        // onChange={(e)=>handleOnChange(e)}
                    />
                </div>
                <div class="form-group">
                    <label for="boardname">
                        Board name
                    </label>
                    <select class="form-control" name="boardname" id="boardname" onChange={(e)=>handleOnChange(e)}>
                        {
                            boardNames.map((board)=> <option>{board.boardname}</option>)
                        }
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleOnSubmit}
                    className="btn btn-primary btn-block"
                >
                    Submit
                </button>
                <div
                    className={
                        alertState.state
                            ? "text-success h4 text-center"
                            : "text-danger h4 text-center"
                    }
                >
                    {alertState.message}
                </div>
            </form>
        </div>
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
)(CreatePin);
