import { useEffect, useState } from 'react';
import './App.css';
import sanalista from "./sanalista.json";

function App() {

  const [yrit, setYrit] = useState([]);
  const [sana, setSana] = useState(sanalista[Math.floor(Math.random() * sanalista.length)]);
  const [kesken, setKesken] = useState("");
  const [tulos, setTulos] = useState([]);
  const [vastaukset, setVastaukset] = useState([]);
  const [voitto, setVoitto] = useState(false);
  const [kirjaimet, setKirjaimet] = useState(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "z", "x", "c", "v", "b", "n", "m"]);
  const [kirjainv, setKirjainv] = useState([]);
  const [laskuri, setLaskuri] = useState([5, 5, 5, 5, 5,5]);
  const [havio, setHavio] = useState(false);
  const [kopio, setKopio] = useState([]);

  while (kirjainv.length < 30) {
    kirjainv.push("black");
  }

  const formatArea = (val) => {
    return (<span>{val}&#11013;</span>)
  }

  const Tarkistus = () => {
    if (sanalista.includes(kesken)) {
      EnterButtonClicked();
    }
  }

  const EnterButtonClicked = () => {
    yrit.push(kesken);
    setTulos([]);

    if (kesken == sana) {
      setVoitto(true);
    }
    else {
      if (vastaukset.length == 5) {
        setHavio(true);
      }
    }

    if (!voitto && !havio) {

      for (let i = 0; i < kesken.length; i++) {
        let k = kesken.charAt(i);
        if (k == sana.charAt(i)) {
          tulos.push({ "kirjain": k, "vari": "lightgreen" })
          kirjainv.splice(kirjaimet.indexOf(k), 1, "lightgreen")
        }
        else if (sana.includes(k)) {
          tulos.push({ "kirjain": k, "vari": "lightyellow" })
          if (kirjainv[kirjaimet.indexOf(k)] != "lightgreen") {
            kirjainv.splice(kirjaimet.indexOf(k), 1, "lightyellow")
          }
        }
        else {
          tulos.push({ "kirjain": k, "vari": "grey" })
          kirjainv.splice(kirjaimet.indexOf(k), 1, "grey")
        }
      }

      //console.log(tulos);
      vastaukset.push(tulos);
      setKesken("");
      laskuri.pop();
      //console.log(vastaukset);
      //console.log(kirjainv);
    }
  }

  const ButtonClicked = (e) => {
    if (kesken.length < 5) {
      setKesken(kesken + e);
    }
  }

  const BackspaceClicked = () => {
    setKesken(kesken.slice(0, kesken.length - 1));
  }

  return (

    <div className="App">
      <h1>SANANEN</h1>
      <br></br>
      <input className='App-input' value={kesken} onChange={(e) => setKesken(e.target.value)} type="text" maxLength={5} size={5}></input>

      <br></br>

      <table className='App-table'>

        <tbody className='App-tulokset'>

          {vastaukset.map((a, i) => {
            return (
              <tr key={i}>{a.map((a, i) => {
                return (
                  <td style={{ backgroundColor: a.vari }} key={i}>{a.kirjain}</td>
                )
              })}

              </tr>
            )
          })}

          {laskuri.map((a, i) => {
            return (<tr key={i}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>)
          })}

        </tbody>
      </table>

      {voitto ? <h2>Voitit pelin!</h2> : null}
      {havio ? <div><h2>Hävisit pelin</h2> <h2>Oikea sana: {sana}</h2> </div>: null}

      <table className='App-table'>
        <tbody>
          <tr>
            {kirjaimet.slice(0, 11).map((a, i) => {
              return (
                <td key={i}><button className='App-button' style={{ backgroundColor: kirjainv[kirjaimet.indexOf(a)] }} value={a} onClick={(e) => ButtonClicked(e.target.value)}>{a}</button></td>
              )
            })}
          </tr>
          <tr>
            {kirjaimet.slice(11, 22).map((a, i) => {
              return (
                <td key={i}><button className='App-button' style={{ backgroundColor: kirjainv[kirjaimet.indexOf(a)] }} value={a} onClick={(e) => ButtonClicked(e.target.value)}>{a}</button></td>
              )
            })}
          </tr>
          <tr>
            <td colSpan={2}><button className='App-button' onClick={() => BackspaceClicked()}>{formatArea()}</button></td>
            {kirjaimet.slice(22, 29).map((a, i) => {
              return (
                <td key={i}><button className='App-button' style={{ backgroundColor: kirjainv[kirjaimet.indexOf(a)] }} value={a} onClick={(e) => ButtonClicked(e.target.value)}>{a}</button></td>
              )
            })}
            <td colSpan={2}><button className='App-button'  onClick={() => Tarkistus()}>Enter</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}

export default App;