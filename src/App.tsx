import "./App.css";
import { useState } from "react";


function App() {
  const [isText,setText] = useState('')

  const getParam = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get('text');
    console.log('textパラメータが変更されました:', textParam);
  }
  
  const changeQueryParam = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const textValue = e.target.value;
    window.history.pushState({}, '', `/?text=${textValue}`);
    getParam()
    handleTextParameter()
  }

  const handleTextParameter = ()=>{
      const urlParams = new URLSearchParams(window.location.search);
      const textParam = urlParams.get('text') ? urlParams.get('text'):"";
      if(textParam !== null){
        setText(textParam)
      }
    
  }

  return (
    <div className="App">
      <div>
        <div className="text">
          <label className="text__label">テキスト入力</label>
          <input id="js-inputText" className="text__input" type={'text'} onChange={(e)=>{changeQueryParam(e)}}/>
        </div>
        <div>
            <p>{isText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

