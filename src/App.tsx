import "./App.css";
import { useState, useEffect } from "react";
import { Profile } from "./type";

function App() {
    const profileInitialData: Profile = {
        firstName: "",
        lastName: "",
    };
    //入力内容の状態管理
    const [profile, setProfile] = useState<Profile>(profileInitialData);

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        setTextStateAction();
    }, []);

    const setTextStateAction = () => {
        const urlParams = window.location.search;
        if (urlParams) {
            const urlQuery = new URLSearchParams(urlParams);
            const urlQueryParams = Object.fromEntries(urlQuery) as Profile;
            setProfile(urlQueryParams);
        }
    };

    //URLパラメータとuseStateの更新
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetInputName = e.target.name;
        const targetInputValue = e.target.value;
        if (targetInputName === "firstName") {
            const nextQueryParams = {
                firstName: targetInputValue,
                lastName: profile.lastName,
            };
            changeQueryParam(nextQueryParams);
            setProfile(nextQueryParams);
        }
        if (targetInputName === "lastName") {
            const nextQueryParams = {
                firstName: profile.firstName,
                lastName: targetInputValue,
            };
            changeQueryParam(nextQueryParams);
            setProfile(nextQueryParams);
        }
    };

    //受け取ったパラメータをURLに反映
    const changeQueryParam = (param: Profile) => {
        const urlSearchParam = new URLSearchParams(param).toString();
        window.history.pushState({}, "", `/?` + urlSearchParam);
    };

    //オブジェクトのプロパティの値の空判定
    const areAllPropertiesEmpty = (obj: Profile) => {
        return Object.values(obj).every((value) => {
            return value === "";
        });
    };

    return (
        <main>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full mx-auto max-w-4xl">
                    <h1 className="font-bold text-2xl text-center mb-20">プロフィール作成画面</h1>
                    <div className="flex w-full justify-between">
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
                                            value={profile.firstName}
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
                                            value={profile.lastName}
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
                            {!areAllPropertiesEmpty(profile) && (
                                <div className="border p-10">
                                    {profile.firstName && (
                                        <dd className="flex items-start gap-2 mb-4 last:mb-0">
                                            <dt>姓：</dt>
                                            <dl>{profile.firstName}</dl>
                                        </dd>
                                    )}
                                    {profile.lastName && (
                                        <dd className="flex items-start gap-2 mb-4 last:mb-0">
                                            <dt>名：</dt>
                                            <dl>{profile.lastName}</dl>
                                        </dd>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
