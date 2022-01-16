import React,{useState , useEffect} from "react" ;
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core" ;
import './App.css';
import InfoBox from './InfoBox' ; 
import Map from "./Map" ; 

function App() {

  const [countries , setCountries] = useState([]) ;
  const [country , setCountry] = useState('worldwide') ; //default


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
  
const onCountryChange = async(event) => {
  const countryCode = event.target.value ;

   setCountry(countryCode) ; 
}

  return (
    <div className="app">

      <div className="app__left">

         {/* covid-19tracker + dropdown  */}
        <div className="app__header">

          <h1>COVID-19 TRACKER </h1>
          <FormControl className = "app__dropdown">
          <Select
            variant ="outlined" 
            onChange={onCountryChange}
            value ={country}
          >
          {/* loop through all the countries and show a drop down */}
          <MenuItem value = "worldwide">Worldwide</MenuItem>
          {
            countries.map((country)=>(
              <MenuItem value ={country.value}>{country.name}</MenuItem>
            ))
          }

          </Select>
        
          </FormControl>

       </div>
     
     
 
       <div className="app__stats">

       {/* infoboxes title = "coronavirus cases"  */}
          <InfoBox title = "Coronavirus Cases" cases={123} total = {2000} />
         

       {/* infoboxes title="coronavirus recoveries"  */}
       <InfoBox title = " Recoveries" cases = {123} total ={3000}/>
       {/* infoboxes title = "deaths"  */}
       <InfoBox title = " Deaths" cases ={123} total ={200}/>


        </div>
      



        {/*  map */}
          <Map />

      </div>


      <Card className="app__right">

        <CardContent>
          <h3>Live Cases by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>

      </Card>

     
    </div>
  );
}

export default App;
