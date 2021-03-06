import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Bank = (props) => {
    var bank = props.data;
    var id = props.id;
    var tableData = ['bank_name', 'ifsc', 'branch', 'bank_id', 'address']
    const [favorites, setFavorites] = useState([])
    const getArray = JSON.parse(localStorage.getItem('favorites') || '0')

    useEffect(() => {
      if(getArray !== 0) {
          setFavorites([...getArray])
      }
    }, []);

    const addToFavorites = (props) => {
        let array = favorites
        let addArray = true;
        array.map((item ,key) => {
            if(item === props.id) {
                array.splice(array.indexOf(item), 1);
                addArray = false;
            }
        });
        if(addArray) {
            array.push(id)
        }

        setFavorites([...array])
        localStorage.setItem('favorites', JSON.stringify(favorites));

        var storage = localStorage.getItem('markedItem' + (props.id) || '0');
        if(storage == null) {
            localStorage.setItem((' markedItem' + (props.id)) , JSON.stringify(props.bank));
        } else {
            localStorage.removeItem('markedItem' + (props.id))
        }
    }
    
    return(
        <tr key={bank.ifsc} className="table-row">
            {tableData.map((data , i) => <td key={i} className='table-data'>
                <Link to={`/bank-details/${bank.ifsc}`} state={{ bank }} >{bank[data]}</Link>
            </td>)}
            {/* <td>
                {
                    favorites.includes(id) ? (<i onClick={() => addToFavorites({bank, id})} className="fas fa-star"></i>) : (<i onClick={() => addToFavorites({bank, id})} className="far fa-star"></i>)
                }
            </td> */}
        </tr>
    )
};