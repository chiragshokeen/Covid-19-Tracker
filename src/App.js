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
import Table from "./Table" ; 
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {

  const [countries , setCountries] = useState([]) ;
  const [country , setCountry] = useState('worldwide') ; //default
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //State = how to write a variable in react
  //USEEFFECT : runs a piece of code based on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
        const sortedData  = sortData(data) ; 
        setTableData(sortedData);
        setCountries(countries) ;
      })
    }

    getCountriesData() ; 
    //and once when the variable changes
  }, [countries]) ; 
  
const onCountryChange = async(event) => { //listener
  const countryCode = event.target.value ;
  setCountry(countryCode) ; 

  const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
         
          
        });


};

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
          <InfoBox title = "Coronavirus Cases" cases={countryInfo.todayCases} total = {countryInfo.cases} />
         

       {/* infoboxes title="coronavirus recoveries"  */}
       <InfoBox title = " Recoveries" cases = {countryInfo.recovered} total ={countryInfo.recovered}/>
       {/* infoboxes title = "deaths"  */}
       <InfoBox title = " Deaths" cases ={countryInfo.todayDeaths} total ={countryInfo.deaths}/>


        </div>
      



        {/*  map */}
          <Map />

      </div>


      <Card className="app__right">

        <CardContent>
          <h3>Live Cases by country</h3>
          {/* table */}

          <Table countries={tableData} />
          
          <h3>Worldwide new cases</h3>
          {/* graph */}
          <LineGraph  />
        </CardContent>

      </Card>

     
    </div>
  );
}

export default App;
