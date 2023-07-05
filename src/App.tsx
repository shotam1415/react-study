import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [firstNameState, setFirstNameState] = useState("");
    const [lastNameState, setLastNameState] = useState("");

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        setTextStateAction();
    }, []);

    //入力した値をパラメータに入れる
    const changeQueryParam = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetInputName = e.target.name;
        const targetInputValue = e.target.value;
        if (targetInputName === "firstName") {
            window.history.pushState({}, "", `/?firstName=${targetInputValue}&lastName=${lastNameState}`);
            setFirstNameState(targetInputValue);
        }
        if (targetInputName === "lastName") {
            window.history.pushState({}, "", `/?firstName=${firstNameState}&lastName=${targetInputValue}`);
            setLastNameState(targetInputValue);
        }
    };

    const setTextStateAction = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const firstNameParam = urlParams.get("firstName") ? urlParams.get("firstName") : "";
        const lastNameParam = urlParams.get("lastName") ? urlParams.get("lastName") : "";
        if (firstNameParam !== null && lastNameParam) {
            setFirstNameState(firstNameParam);
            setLastNameState(lastNameParam);
        }
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
                                value={firstNameState}
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
                                value={lastNameState}
                                onChange={(e) => {
                                    changeQueryParam(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <p>
                            私の名前は{firstNameState}
                            {lastNameState}です
                        </p>
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
