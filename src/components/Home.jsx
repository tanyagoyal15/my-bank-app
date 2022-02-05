import React, { useEffect, useState, useMemo} from "react";
import { Pagination } from "./Pagination";
import { Bank } from "./Bank";
import { Input } from './Input';

export const Home = (props) => {
  var heading = ["Bank ", "IFSC", "Branch", "Bank ID", "Address"];
  var cities = ["Mumbai", "Delhi", "Bangalore" , "Pune" , "Hyderabad"];
  var categories = ["IFSC" , "Branch" , "Bank Name"]
  const [banks, setBanksList] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("No Data Found");
  const [cachedData, setCachedData] = useState({});
  let abc = [];
  let url = `https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI`
  var y; var z;

  const fetchData = async(city) => {
    console.log("Fetching for City : " , city);
    setLoader(true);
    url = `https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`;
    getDataFromService(city)
  } 

  const getDataFromService = async(city) => {
    console.log("FETCH FROM API");
    const response = await fetch(url);
    const data = await response.json();
    setCachedData({[url] : data})
    y = { [url] : data };
    z = {...cachedData, ...y};
    setCachedData(z)
    for(let url in z) {
      if(url.includes(city.toUpperCase())) {
        setBanksList(z[url]);
        setLoader(false)
      }
    }
  }

  useEffect(() => {
    fetchData('MUMBAI');
  }, []);

  const handleSelect = event => {
    // when we change city filter it either gets data from cache or api , it does not see other filters look into this
    setCity(event.target.value);
    let dataFromCache = getDataFromCache(cachedData, event.target.value);
    setBanksList(dataFromCache);
    setLoader(false)
    if(!dataFromCache.length) {
      fetchData(event.target.value);
    }
    if(!cachedData) {
      setLoader(false)
    }
  }

  const handleCategory = event => {
    setCategory(event.target.value);
  }

  const handleOnChange = event => {
    setQuery(event)
    updateList(event);
  }

  const updateList = (query) => {
    let filteredBanks = [...banks];
    if(query) {
      abc = filteredBanks.length ? 
              filteredBanks.filter(bank => bank[category] === query) : 
              getDataFromCache(cachedData, city).filter(bank => bank[category] === query)
              
      setBanksList(abc);
    } else {
      let dataFromCache = getDataFromCache(cachedData, city)
      setBanksList(dataFromCache);
      setLoader(false);
    }
  }

  const getDataFromCache = (cachedData, cityToBeSearched) => {
    let data = [];
    for(let prop in cachedData) {
      if(prop.includes(cityToBeSearched.toUpperCase())) {
        console.log("GET FROM CACHE");
        data = cachedData[prop];
      } 
    }

    return data;
  }

  return (
    <div className="home">
      <div className="filters">
        <select onChange={handleSelect} name="city" placeholder="Select City" className="select-dropdown">{
          cities.map( (city) => 
            <option key={city} value={city.toUpperCase()}>{city}</option> )
        }</select>

        <select onChange={handleCategory} name="category" placeholder="Select Category" className="select-dropdown">
          <option></option>
          { categories.map( (category,idx) => 
            <option key={category} value={category.toLowerCase().split(" ").join("_")}>{category}</option> )
        }</select>

        <Input
        type='text'
        name='search'
        placeholder='Search'
        onChange={(e) => handleOnChange(e)}
      />
      </div>
      
      <div className="bank-list">
      {
        !banks.length && loader ? <div>Loading...</div> : 
          banks.length > 0 ? 
            <Pagination data={banks} heading={heading} RenderComponent={Bank} pageLimit={5} dataLimit={5} /> 
            : <h1>No Banks to display</h1>
      }
      </div>  
    </div>
  );
};