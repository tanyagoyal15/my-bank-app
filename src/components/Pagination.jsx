import React , { useState} from 'react';

export const Pagination = ({ data, heading, RenderComponent, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(dataLimit);
  const rowOptions = [5, 10, 20, 30 , 50, 100];

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  }

  const getPaginatedData = (limit) => {
    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  };

  const handleRowChange = (event) => {
    setLimit(parseInt(event.target.value))
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className='list-pagination-section'>  
      <table align={"center"}>
          <thead>
            <tr>
              {heading.map((head, i) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {getPaginatedData(limit).map((d, idx) => (
            <RenderComponent key={idx} data={d} id={idx}/>
          ))}
          </tbody>
        </table>
      <div className="pagination">

        <div>
          <span className='rows-per-page'>
            Rows per Page: <select onChange={handleRowChange} name="row" className="select-row">
            { rowOptions.map( (option) => 
              <option key={option} value={option}>{option}</option> )
            } </select>
          </span>

          <i onClick={goToPreviousPage}
            className={`prev fas fa-chevron-left ${currentPage === 1 ? 'disabled' : ''}`}
            style={{marginRight: '20px' , cursor: 'pointer'}}></i>

          {`${getPaginationGroup()[0]} - ${getPaginationGroup()[getPaginationGroup().length-1]} of ${data.length}`}
    
          <i onClick={goToNextPage}
            className={`next fas fa-chevron-right ${currentPage === pages ||  getPaginationGroup()[getPaginationGroup().length-1] > data.length ? 'disabled' : ''}`}
            style={{marginLeft: '20px' , cursor: 'pointer'}}></i>
        </div>
      </div>
    </div>
  )
};
