import React from 'react';
import { Link } from 'react-router-dom';

export const Bank = (props) => {
    var bank = props.data;
    var tableData = ['bank_name', 'ifsc', 'branch', 'bank_id', 'address']

    return(
        <tr key={bank.ifsc} className="table-row">
            {tableData.map(data => <td className='table-data'>
                <Link to={`/bank-details/${bank.ifsc}`} state={{ bank }} >{bank[data]}</Link>
            </td>)}
        </tr>
    )
};