import "./App.css";
import { useState, useEffect } from "react";
import { Name } from "./type";

function App() {
    const nameStateInitialData:Name = {
        firstName:"",
        lastName:"",
    }
    //入力内容の状態管理
    const [NameState,setNameState] = useState<Name>(nameStateInitialData)

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        setTextStateAction();
    }, []);

    const setTextStateAction = () => {
        const urlParams = window.location.search;
        if(urlParams){
            const urlQuery = new URLSearchParams(urlParams);
            const urlQueryParams = Object.fromEntries(urlQuery) as Name;
            setNameState(urlQueryParams)
        }
    };

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

    //受け取ったパラメータをURLに反映
    const changeQueryParam = (param:Name)=>{
        const urlSearchParam =  new URLSearchParams(param).toString();
        window.history.pushState({}, "", `/?`+urlSearchParam);     
    }


    //オブジェクトのプロパティの値の空判定
    const areAllPropertiesEmpty = (obj:Name)=>{
        return Object.values(obj).every((value)=>{return value ===""})
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex w-full justify-between max-w-4xl">
                <div className="w-2/6">
                <h2 className="text-center mb-4 font-bold text-xl">入力画面</h2>
                <div className="border p-10">
                    <div className="mb-4">
                        <div className="mb-4">
                            <label className="block">姓</label>
                            <input
                                className="border block w-full"
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
                                className="border block w-full"
                                name="lastName"
                                type={"text"}
                                value={NameState.lastName}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div className="w-3/6">
                    <h2 className="text-center mb-4 font-bold text-xl">プレビュー画面</h2>
                    {!areAllPropertiesEmpty(NameState) && 
                    <div className="border p-10">
                        {NameState.firstName &&
                            <dd className="flex items-start gap-2 mb-4 last:mb-0">
                                <dt>姓：</dt>
                                <dl>{NameState.firstName}</dl>
                            </dd>
                        }
                        {NameState.lastName &&
                            <dd className="flex items-start gap-2 mb-4 last:mb-0">
                                <dt>名：</dt>
                                <dl>{NameState.lastName}</dl>
                            </dd>
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
