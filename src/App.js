import React,{useState , useEffect} from "react" ;
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core" ;
import './App.css';

function App() {

  const [countries , setCountries] = useState([
    
  ]) ;


  //State = how to write a variable in react
  //USEEFFECT : runs a piece of code based on a given condition

  useEffect(() => {
   //code inside here once when component loads and not again after
    
    //async - send a request, wait fot it , do something with it

    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries" ).then((response) => response.json()).then((data) => {
        const countries = data.map((country)=>(
          {
            name: country.country , //United states , India
            value: country.countryInfo.iso2 // USA IN UK

        }
        ));
        setCountries(countries) ;
      })
    }

    getCountriesData() ; 
    //and once when the variable changes
  }, [countries]) ; 
  


  return (
    <div className="app">
       <div className="app__header">

       <h1>COVID-19 TRACKER </h1>
      <FormControl>
        <Select
          variant ="outlined" 
          value ="abc"
        >
          {/* loop through all the countries and show a drop down */}

          {
            countries.map((country)=>(
              <MenuItem value ={country.value}>{country.name}</MenuItem>
            ))
          }

        </Select>
        
      </FormControl>

       </div>
     
      

      {/* covid-19tracker + dropdown  */}


      {/* infoboxes  */}
      {/* infoboxes  */}
      {/* infoboxes  */}


      {/* table   */}

      {/* graph  */}

      {/*  map */}


    </div>
  );
}

export default App;
