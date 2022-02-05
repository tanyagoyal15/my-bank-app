import React from 'react';
import { useLocation } from 'react-router-dom';

export const BankDetails = () => {
  var location = useLocation();
  let bank = location.state.bank;

  return (
    <div>
      <h2 className='title'>Bank Details</h2>
      <div className='card'>
        <div><b>IFSC : </b> {bank.ifsc}</div>
        <div><b>Bank ID : </b> {bank.bank_id}</div>
        <div><b>Bank Name : </b> {bank.bank_name}</div>
        <div><b>Branch : </b> {bank.branch}</div>
        <div><b>City : </b> {bank.city}</div>
        <div><b>State : </b> {bank.state}</div> 
        <div><b>Address : </b> {bank.address}</div>
      </div>
    </div>
  )
};
