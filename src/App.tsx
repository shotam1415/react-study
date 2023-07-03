import "./App.css";

const changeQueryParam = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const textValue = e.target.value;
  // window.location.replace(`/?text=${textValue}`) ;
  window.history.pushState({}, '', `/?text=${textValue}`);
  getParam()
  handleTextParameter()
}

const getParam = ()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const textParam = urlParams.get('text');
  console.log('textパラメータが変更されました:', textParam);
}


const handleTextParameter = (...intervalID:any)=>{
  const textElement = window.document.getElementById('js-text');
  if(textElement){
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get('text');
    console.log('complete');
    console.log(document.readyState)
    console.log(document.getElementById('js-text'))
    textElement.innerText = String(textParam)
  }
}

const displayTextFromParameter = ()=>{
  const textElement = window.document.getElementById('js-text');
  const intervalID = setInterval(()=>{
    if(!textElement){
      clearInterval(intervalID)
      handleTextParameter()
      // const urlParams = new URLSearchParams(window.location.search);
      // const textParam = urlParams.get('text');
      
      // const textElement = window.document.getElementById('js-text');
      // const textInputElement = window.document.getElementById('js-textInput') as HTMLInputElement;;


      // if(textElement && textInputElement){
      //   textElement.innerText = String(textParam)
      //   textInputElement.value = String(textParam)
      // }
      
    }
  },1000)
}

window.addEventListener('load',()=>{
  displayTextFromParameter()
});
// window.document.addEventListener('readystatechange', (event) => {
//   handleTextParameter()
// });

function App() {
  return (
    <div className="App">
      <div>
        <div className="text">
          <label className="text__label">テキスト入力</label>
          <input id="js-inputText" className="text__input" type={'text'} onChange={(e)=>{changeQueryParam(e)}}/>
        </div>
        <div>
            <p id="js-text"></p>
        </div>
      </div>
    </div>
  );
}

export default App;

