import "./App.css";
import { useState, useEffect } from "react";
import { Profile } from "./type";

function App() {
    const profileInitialData: Profile = {
        firstName: "",
        lastName: "",
        experiencedLanguages:[]
    };
    //入力内容の状態管理
    const [profile, setProfile] = useState<Profile>(profileInitialData);

    //リロード時にパラメータをStateに格納する。
    useEffect(() => {
        getQueryParam();
    }, []);

    useEffect(()=>{
        console.log(profile)
        console.log(checkALLEmptyProperties(profile))
    },[profile])

    const getQueryParam = () => {
        const urlParams = window.location.search;
        if (urlParams) {
            const urlQuery = new URLSearchParams(urlParams);
            
            const firstName = urlQuery.get('firstName') ? urlQuery.get('firstName'):"";
            const lastName = urlQuery.get('lastName')? urlQuery.get('lastName'):"";
            const experiencedLanguages = urlQuery.get('experiencedLanguages') ?  urlQuery.get('experiencedLanguages'):"";

            const urlParam = {
                firstName:firstName !==null ? firstName :"",
                lastName:lastName !==null ? lastName :"",
                experiencedLanguages:experiencedLanguages?.split(',').filter(Boolean)
            }
            //stateに挿入
            setProfile(urlParam);
        }
    };

    //URLパラメータとuseStateの更新
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetInputName = e.target.name;
        const targetInputValue = e.target.value;
        
        //URLパラメータに格納するオブジェクト作成
        const nextQueryParams = {
                firstName: targetInputName === "firstName" ? targetInputValue: profile.firstName,
                lastName: targetInputName === "lastName" ? targetInputValue : profile.lastName,
                experiencedLanguages: targetInputName === "experiencedLanguages" ? updateExperiencedLanguages(targetInputValue): profile.experiencedLanguages
        };
        //クエリにデータを格納
        changeQueryParam(nextQueryParams);

        //setStateを更新
        if(targetInputName !== "experiencedLanguages"){
            setProfile(nextQueryParams);
        }
    };

    //受け取ったパラメータをURLに反映
    const changeQueryParam = (param: any) => {
        const urlSearchParam = new URLSearchParams(param);
        window.history.pushState({}, "", `/?` + urlSearchParam);
    };

    //チェックボックスのState更新用メソッド
    const updateExperiencedLanguages = (value:string)=>{
        //重複した値があるかどうか判定
        if(!profile.experiencedLanguages.filter((item:string)=>(item === value)).length){
            const setValues = [...profile.experiencedLanguages, value]
            //値を追加
            setProfile((state:any) => ({
                ...state,
                experiencedLanguages: setValues
              }))
              return setValues;
        }else{
            const setValues = profile.experiencedLanguages.filter((item:string) => (item !== value))
            //値を削除
            setProfile((state:Profile) => ({
                ...state,
                experiencedLanguages: setValues
              }))
              return setValues;
        }
    }

    //checkされている値の判定
    const checkExperiencedLanguagesChecked = (value:string)=>{
        if(!profile.experiencedLanguages.filter((item:string)=>(item === value)).length){
            return false
        }else{
            return true
        }
    }

    //オブジェクトのプロパティの値の空判定
    const checkALLEmptyProperties = (obj: Profile) => {
            const result = Object.values(obj).map((item:string) => {
                if(item === "" || item.length === 0){
                    return true
                }else{
                    return false
                }
            })
            return result.every((value)=>{
                return value === true
            })

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
                                            <input type="checkbox" id="checkbox01" onChange={(e)=>{handleInputChange(e)}} name="experiencedLanguages" value="React/Next.js" checked={checkExperiencedLanguagesChecked("React/Next.js")}></input>
                                            <label htmlFor="checkbox01">React/Next.js</label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" id="checkbox02" onChange={(e)=>{handleInputChange(e)}} name="experiencedLanguages" value="Vue.js/Nuxt.js" checked={checkExperiencedLanguagesChecked("Vue.js/Nuxt.js")}></input>
                                            <label htmlFor="checkbox02">Vue.js/Nuxt.js</label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" id="checkbox03" onChange={(e)=>{handleInputChange(e)}} name="experiencedLanguages" value="TypeScript" checked={checkExperiencedLanguagesChecked("TypeScript")}></input>
                                            <label htmlFor="checkbox03">TypeScript</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-center mb-4 font-bold text-xl">プレビュー画面</h2>
                            {!checkALLEmptyProperties(profile) &&
                                <div className="border p-10">
                                    <div className="mb-4">
                                        <p className="text-center">{profile.firstName}{profile.lastName}</p>
                                    </div>
                                    {profile.experiencedLanguages.length > 0 &&
                                    <div>
                                        <p className="font-bold mb-2">経験が多い言語/フレームワーク</p>
                                        <ul className="flex items-center gap-2">
                                            {profile.experiencedLanguages.map((item:string,index:number)=>{
                                                return <li key={index}>{item}</li>
                                            })}
                                        </ul>
                                    </div>
                                    }
                                </div>
}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
