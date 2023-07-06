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

        const nextQueryParams = {
            firstName: targetInputName === "firstName" ? targetInputValue: profile.firstName,
            lastName: targetInputName === "lastName" ? targetInputValue : profile.lastName
        };

        changeQueryParam(nextQueryParams);
        setProfile(nextQueryParams);
    };

    //受け取ったパラメータをURLに反映
    const changeQueryParam = (param: Profile) => {
        const urlSearchParam = new URLSearchParams(param);
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
                    <div className="text-center">
                        <h1 className="font-bold text-2xl mb-4">プロフィール作成画面</h1>
                        <p className="mb-20">社内のみんなに知ってもらいたいことを書こう</p>
                    </div>
                    <div className="flex w-full justify-between gap-4">
                        <div className="w-1/2">
                            <h2 className="text-center mb-4 font-bold text-xl">入力画面</h2>
                            <div className="border p-10">
                                <div className="mb-4">
                                    <div className="flex gap-2">
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
                                <div>
                                    <label className="mb-1 block">経験が多い言語/フレームワーク</label>
                                    <div className="flex flex-wrap items-start gap-2">
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" id="checkbox01"></input>
                                            <label htmlFor="checkbox01">React/Next.js</label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" id="checkbox02"></input>
                                            <label htmlFor="checkbox02">Vue.js/Nuxt.js</label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" id="checkbox02"></input>
                                            <label htmlFor="checkbox02">TypeScript</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-center mb-4 font-bold text-xl">プレビュー画面</h2>
                            {!areAllPropertiesEmpty(profile) && (
                                <div className="border p-10">

                                    {/* {profile.firstName && (
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
                                    )} */}
                                    <div>
                                        <p className="text-center">{profile.firstName}{profile.lastName}</p>
                                    </div>
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
