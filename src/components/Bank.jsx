import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Bank = (props) => {
    var bank = props.data;
    var tableData = ['bank_name', 'ifsc', 'branch', 'bank_id', 'address']
    const [favorites, setFavorites] = useState([])
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')

    useEffect(() => {
      if(getArray !== 0) {
          setFavorites([...getArray])
      }
    }, []);

    const addFav = (props) => {
        let array = favorites
        let addArray = true;
        array.map((item ,key) => {
            if(item === props.i) {
                array.splice(key,1);
            }
        });
        if(addArray) {
            array.push(props.i)
        }

        setFavorites([...array])
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    
    return(
        <tr key={bank.ifsc} className="table-row">
            {tableData.map(data => <td className='table-data'>
                <Link to={`/bank-details/${bank.ifsc}`} state={{ bank }} >{bank[data]}</Link>
            </td>)}
            {/* <td>
                {
                    favorites.includes(5) ? (<i onClick={() => addFav(bank, 5)} class="fas fa-star"></i>) : (<i onClick={() => addFav(bank, 5)} class="far fa-star"></i>)
                }
            </td> */}
        </tr>
    )
};