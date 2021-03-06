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
import { sortData , prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {

  const [countries , setCountries] = useState([]) ;
  const [country , setCountry] = useState('worldwide') ; //default
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.7041 , lng: 77.1025 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


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
        setMapCountries(data) ; 
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
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
         
          
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
          <InfoBox 
          isRed
           active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
          title = "Coronavirus Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} 
          total = {prettyPrintStat(countryInfo.cases)} />
         

       {/* infoboxes title="coronavirus recoveries"  */}
       <InfoBox 
        isGreen
        active={casesType === "recovered"}
         onClick={(e) => setCasesType("recovered")}
         title = " Recovered" 
         cases = {prettyPrintStat(countryInfo.todayRecovered)} 
         total ={prettyPrintStat(countryInfo.recovered)}/>
         
       {/* infoboxes title = "deaths"  */}
       <InfoBox 
         isPurple
         active={casesType === "deaths"}
         onClick={(e) => setCasesType("deaths")}
         title = " Deaths" 
         cases ={prettyPrintStat(countryInfo.todayDeaths)} 
         total ={prettyPrintStat(countryInfo.deaths)}/>


        </div>
      



        {/*  map */}
          <Map
          
          countries={mapCountries}
         casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          
          />

      </div>


      <Card className="app__right">

        <CardContent>
          <h3 className ="table__title ">Live Cases by Country</h3>
          {/* table */}

          <Table countries={tableData} />

          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          {/* graph */}
          <LineGraph className = "app__graph "casesType ={casesType}  />
        </CardContent>

      </Card>

     
    </div>
  );
}

export default App;
