import React from 'react';
import { Bank } from './Bank';
import { Pagination } from './Pagination';

export const Favorite = () => {
  let myList = [{}];
  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
  for(var i = 0; i< getArray.length; i++) {
    // myList[i] = JSON.parse(localStorage.getItem('markedItem' + getArray[i]) || '');

    // Adding a hardcoded list to render as of now
    // Values are present in LS but this statement (localstorage.getItem...) is returning null for the given indexes
    myList = [{
      bank_name: "ABHYUDAYA COOPERATIVE BANK LIMITED",
      ifsc: "ABHY0065001",
      branch: "RTGS-HO",
      bank_id: 60,
        address: "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
    }, {
      bank_name: "ABHYUDAYA COOPERATIVE BANK LIMITED",
      ifsc: "ABHY0065001",
      branch: "RTGS-HO",
      bank_id: 60,
        address: "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
    }]
  }

  const titles = Object.keys(myList[0])
  return (
    <div>
      <h5>My List</h5>
      { myList.length > 0 ? <Pagination data={myList} heading={titles} RenderComponent={Bank} pageLimit={5} dataLimit={5} /> : <h1 className="error">No Data Found</h1>}
    </div>
  );
};
