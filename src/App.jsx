import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

const baseURL = 'https://estagio.geopostenergy.com/WorldCup/GetAllTeams'

let config = {
  headers: {
    'git-user':'arthurdpcm'
  }
}

function shuffleArray(arr) {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
}

const tableGroup = (countries,groupName) =>{
  return (
    <div className="container text-center">
      <table className="row ">
        <tr><th >Grupo {groupName}</th></tr>
        {countries.map((e)=>(
          <tr className='col'>
            <td>{e.Name}</td>
          </tr>
        ))}

      </table>
    </div>
  )
}

const simulateMatch = (countries, groupName) =>{
  return(
    <div>
      <tr><th> Partidas do Grupo {groupName} </th></tr>
      {
        countries.map((e)=>(
          <p>{e.Name} X </p>
        ))
      }

    </div>
  )
}


function App() {

  const [countries, setCountries] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showMatches, setShowMatches] = useState(false);


  useEffect(() =>{
    axios.get(baseURL, config).then((response)=>{
      setCountries(shuffleArray(response.data.Result))
    })
  }, [])


  const handleGenerateGroup = () =>{ 
    var i = 0
    var storeGroup = []
    const groupNames = ['A','B','C','D','E','F','G','H']
    
    if(countries.length > 0){
      var j = 0
      for(i = 0; i<countries.length; i+=4){
        
        //console.log(countries.length)
        const aux = countries.slice(i,i+4)
        const groupInfo = {
          "groupName": groupNames[j],
          "countries": aux,
        }
        storeGroup.push(groupInfo)
        j+=1
      }
    }
    console.log(storeGroup)
    setShowMatches(true)
    setGroups(storeGroup)
  }



  return (
    <div className="App">

      <h1>COPA DO MUNDO</h1>

      <button onClick={handleGenerateGroup}> Gerar grupos </button>
      
      <div className="container">
        {groups.map((obj)=>tableGroup( obj.countries, obj.groupName))}
      </div>
      <br />
      <br />
      <div className="container">
        <h2>{ showMatches?<h2>Partidas</h2>:<h2>Sem seleções</h2>}</h2>
        
        {groups.map((obj)=> simulateMatch(obj.countries, obj.groupName))}

      </div>
    </div>
  );
}

export default App;
