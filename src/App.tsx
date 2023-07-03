import "./App.css";


const changeQueryParam = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const textValue = e.target.value;
  // window.location.replace(`/?text=${textValue}`) ;
  window.history.pushState({}, '', `/?text=${textValue}`);
  getParam()
}


const getParam = ()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const textParam = urlParams.get('text');
  console.log('textパラメータが変更されました:', textParam);
}

function App() {
  return (
    <div className="App">
      <div className="text">
        <label className="text__label">テキスト入力</label>
        <input className="text__input" type={'text'} onChange={(e)=>{changeQueryParam(e)}}/>
      </div>
    </div>
  );
}

export default App;
