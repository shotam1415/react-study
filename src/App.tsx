import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [NameState,setNameState] = useState({
        firstName:"",
        lastName:"",
    })

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        setTextStateAction();
    }, []);

    //入力した値をパラメータに入れる
    const changeQueryParam = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetInputName = e.target.name;
        const targetInputValue = e.target.value;
        if (targetInputName === "firstName") {
            const params = {
                firstName: targetInputValue,
                lastName: NameState.lastName
            }
            const urlSearchParam =  new URLSearchParams(params).toString();
            window.history.pushState({}, "", `/?`+urlSearchParam);
            setNameState(params)
        }
        if (targetInputName === "lastName") {
            const params = {
                firstName: NameState.firstName,
                lastName: targetInputValue
            }
            const urlSearchParam =  new URLSearchParams(params).toString();
            window.history.pushState({}, "", `/?`+urlSearchParam);            
            setNameState(params)
        }
    };

    const setTextStateAction = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const firstNameParam = urlParams.get("firstName") ? urlParams.get("firstName") : "";
        const lastNameParam = urlParams.get("lastName") ? urlParams.get("lastName") : "";
        const params = {
            firstName: firstNameParam ? firstNameParam:"",
            lastName: lastNameParam ? lastNameParam:""
        }
        const urlSearchParam =  new URLSearchParams(params).toString();
        window.history.pushState({}, "", `/?`+urlSearchParam);
        setNameState(params)
    };

    const doReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="border p-10">
                    <div className="mb-4">
                        <div className="mb-4">
                            <label className="block">姓</label>
                            <input
                                className="border"
                                name="firstName"
                                type={"text"}
                                value={NameState.firstName}
                                onChange={(e) => {
                                    changeQueryParam(e);
                                }}
                            />
                        </div>
                        <div className="">
                            <label className="block">名</label>
                            <input
                                className="border"
                                name="lastName"
                                type={"text"}
                                value={NameState.lastName}
                                onChange={(e) => {
                                    changeQueryParam(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                                <p>私の名前は{NameState.firstName+NameState.lastName}です</p>
                    </div>
                    <button type="button" className="border p-2" onClick={() => doReload()}>
                        更新する
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
