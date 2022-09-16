
import { useEffect, useState } from 'react';
import './App.css';



function App() {

  const [syote, setSyote] = useState("");
  const [sana, setSana] = useState("muori");
  const [kesken, setKesken] = useState("");
  const [tulos, setTulos] = useState([]);
  const [vastaukset, setVastaukset] = useState([]);
  const [voitto, setVoitto] = useState(false);
  const [kirjaimet, setKirjaimet] = useState(["q","w","e","r","t","y","u","i","o","p","å","a","s","d","f","g","h","j","k","l","ö","ä","z","x","c","v","b","n","m"]);
  const [kirjainv, setKirjainv] = useState([]);

  while (kirjainv.length < 30){
    kirjainv.push("black");
  }

  const formatArea = (val) => {
    return (<span>{val}&#11013;</span>)
  }


  const EnterButtonClicked = () => {

    setTulos([]);

    for (let i = 0; i < kesken.length; i++) {
      let k = kesken.charAt(i);
      if(kesken == sana){
        setVoitto(true);
      }
      if (k == sana.charAt(i)) {
        tulos.push({"kirjain": k,"vari": "lightgreen"})
        kirjainv.splice(kirjaimet.indexOf(k),1,"lightgreen")
      }
      else if (sana.includes(k)) {
        tulos.push({"kirjain": k,"vari": "lightyellow"})
        if(kirjainv[kirjaimet.indexOf(k)]!="lightgreen"){
          kirjainv.splice(kirjaimet.indexOf(k),1,"lightyellow")
        }
      }
      else {
        tulos.push({"kirjain": k,"vari": "black"})
        kirjainv.splice(kirjaimet.indexOf(k),1,"grey")
      }
    }

    //console.log(kirjaimet.indexOf("A"));
    //console.log(tulos);
    vastaukset.push(tulos);
    setKesken("");
    //console.log(vastaukset);
    //console.log(kirjainv);

  }

  const ButtonClicked = (e) => {
    if(kesken.length<5){
      setKesken(kesken+e);
    }
  }

  const BackspaceClicked = () => {
    setKesken(kesken.slice(0,kesken.length-1));
  }


  return (

    <div className="App">
      <h1>SANANEN</h1>
      <br></br>
      <input className='App-input' value={kesken} onChange={(e) => setKesken(e.target.value)} type="text" maxLength={5} size={5}></input>
      
      <br></br>
      
      <div>
        {vastaukset.map((a,i)=>{
          return(
            <h2 key={i}>{i+1}: {a.map((a,i)=>{
              return(
                <span style={{color:a.vari}} key={i}>{a.kirjain}</span>
              )
            })}
            </h2>
          )
        })
        }
      </div>

      <table className='App-table'>
        <tbody>
          <tr>
          {kirjaimet.slice(0,11).map((a,i)=>{
            return(
              <td key={i}><button className='App-button' style={{backgroundColor:kirjainv[kirjaimet.indexOf(a)]}} value={a} onClick={(e)=>ButtonClicked(e.target.value)}>{a}</button></td>
            )
          })}
         </tr>
         <tr>
          {kirjaimet.slice(11,22).map((a,i)=>{
            return(
              <td key={i}><button className='App-button' style={{backgroundColor:kirjainv[kirjaimet.indexOf(a)]}} value={a} onClick={(e)=>ButtonClicked(e.target.value)}>{a}</button></td>
            )
          })}
         </tr>
         <tr>
         <td colSpan={2}><button className='App-button' style={{width:"100px"}} onClick={() => BackspaceClicked()}>{formatArea()}</button></td>
          {kirjaimet.slice(22,29).map((a,i)=>{
            return(
              <td key={i}><button className='App-button' style={{backgroundColor:kirjainv[kirjaimet.indexOf(a)]}} value={a} onClick={(e)=>ButtonClicked(e.target.value)}>{a}</button></td>
            )
          })}
          <td colSpan={2}><button className='App-button' style={{width:"100px"}} onClick={() => EnterButtonClicked()}>Enter</button></td>
         </tr>
        </tbody>
      </table>

      {voitto? <h2>Voitit pelin</h2>:null }

    </div>


  );
}

export default App;
