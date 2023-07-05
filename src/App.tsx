import "./App.css";
import { useState, useEffect } from "react";

function App() {
    type Name = {
        firstName :string,
        lastName: string
    }
    const nameStateInitialData:Name = {
        firstName:"",
        lastName:"",
    }
    const [NameState,setNameState] = useState<Name>(nameStateInitialData)

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        setTextStateAction();
    }, []);

    //URLパラメータとuseStateの更新
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetInputName = e.target.name;
        const targetInputValue = e.target.value;
        if (targetInputName === "firstName") {
            const nextQueryParams = {
                firstName: targetInputValue,
                lastName: NameState.lastName
            }
            changeQueryParam(nextQueryParams)
            setNameState(nextQueryParams)
        }
        if (targetInputName === "lastName") {
            const nextQueryParams = {
                firstName: NameState.firstName,
                lastName: targetInputValue
            }
            changeQueryParam(nextQueryParams)
            setNameState(nextQueryParams)
        }
    };

    const changeQueryParam = (param:Name)=>{
        const urlSearchParam =  new URLSearchParams(param).toString();
        window.history.pushState({}, "", `/?`+urlSearchParam);     
    }

    const setTextStateAction = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const firstNameParam = urlParams.get("firstName") ? urlParams.get("firstName") : "";
        const lastNameParam = urlParams.get("lastName") ? urlParams.get("lastName") : "";

        const QueryParams = {
            firstName: firstNameParam ? firstNameParam:"",
            lastName: lastNameParam ? lastNameParam:""
        }
        setNameState(QueryParams)
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
                                    handleInputChange(e);
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
                                    handleInputChange(e);
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
