import "./App.css";
import { useState,useEffect } from "react";

function App() {
  const [isText,setText] = useState('')

  //リロード時にパラメータをStateに格納する。
  useEffect(()=>{
    setIsText()
  },[])
  
  //入力した値をパラメータに入れる
  const changeQueryParam = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const textValue = e.target.value;
    window.history.pushState({}, '', `/?text=${textValue}`);
    setIsText()
  }

  const setIsText = ()=>{
      const urlParams = new URLSearchParams(window.location.search);
      const textParam = urlParams.get('text') ? urlParams.get('text'):"";
      if(textParam !== null){
        setText(textParam)
      }
  }

  const doReload = ()=>{
    window.location.reload();
  }

  return (
    <div className="App">
      <div>
        <div className="text">
          <label className="text__label">テキスト入力</label>
          <input className="text__input" type={'text'} value={isText} onChange={(e)=>{changeQueryParam(e)}}/>
        </div>
        <div>
            <p>パラメータの内容が表示されます。</p>
            <p>{isText}</p>
        </div>
        <button type="button" onClick={()=>doReload()}>更新する</button>
      </div>
    </div>
  );
}

export default App;

