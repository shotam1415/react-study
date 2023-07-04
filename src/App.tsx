import "./App.css";
import { useState } from "react";


function App() {
  const [isText,setText] = useState('')
  
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

