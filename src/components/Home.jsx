import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Bank } from "./Bank";
import { Input } from './Input';

export const Home = (props) => {
  var heading = ["Bank ", "IFSC", "Branch", "Bank ID", "Address"];
  var cities = ["Mumbai", "Delhi", "Bangalore" , "Pune" , "Hyderabad"];
  var categories = ["IFSC" , "Branch" , "Bank Name"];
  var dataObj;
  const [banks, setBanksList] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [cachedData, setData] = useState({});
  const [disabled, setInputDisabled] = useState(true)

  const fetchData = async(city) => {
    setLoader(true);
    let url = `https://vast-shore-74260.herokuapp.com/banks?city=${city.toUpperCase()}`
    const response = await fetch(url);
    const data = await response.json();
    dataObj = {...cachedData, ...{ [url] : data }};
    setData({...cachedData, ...{ [url] : data }})
    for(let url in dataObj) {
      if(url.includes(city.toUpperCase())) {
        setBanksList(dataObj[url]);
        setLoader(false)
      }
    }
  } 

  useEffect(() => {
    fetchData('MUMBAI');
  },[]);

  const handleSelect = event => {
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
    updateList(event.target.value, query)
    event.target.value ? setInputDisabled(false) : setInputDisabled(true);
  }

  const handleOnChange = event => {
    setQuery(event)
    updateList(category, event);
  }

  const updateList = (category, query) => {
    let filteredBanks = [...banks];
    if(query) {
      filteredBanks = filteredBanks.length ? 
              filteredBanks.filter(bank => bank[category] === query) : 
              getDataFromCache(cachedData, city).filter(bank => bank[category] === query)
              
      setBanksList(filteredBanks);
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
        data = cachedData[prop];
      } 
    }

    return data;
  }

  return (
    <div className="home">
      <div className="filters">
        <h2>All Banks</h2>
        <div>
        <select onChange={handleSelect} name="city" placeholder="Select City">{
          cities.map( (city) => 
            <option key={city} value={city.toUpperCase()}>{city}</option> )
        }</select>

        <select onChange={handleCategory} name="category" placeholder="Select Category">
          <option value="">Select Category</option>
          { categories.map( (category) => 
            <option key={category} value={category.toLowerCase().split(" ").join("_")}>{category}</option> )
        }</select>

        <Input
          type='text'
          name='search'
          placeholder='Search'
          disabled={disabled}
          onChange={(e) => handleOnChange(e)}
        />
        </div>
      </div>
      
      <div className="bank-list">
      {
        !banks.length && loader ? <div className="loading">Loading...</div> : 
          banks.length > 0 ? 
            <Pagination data={banks} heading={heading} RenderComponent={Bank} pageLimit={10} dataLimit={10} /> 
            : <h1 className="error">No Data Found</h1>
      }
      </div>  
    </div>
  );
};