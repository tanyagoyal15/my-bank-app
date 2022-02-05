import React , { useState} from 'react';

export const Pagination = ({ data, heading, RenderComponent, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>  
      <table align={"center"}>
          <thead>
            <tr>
              {heading.map((head) => (
                <th>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
          </tbody>
        </table>
      <div className="pagination">

        <div>
        {`Showing Page:  ${currentPage}`}
          <span className='rows-per-page'>{`Rows per Page: ${getPaginatedData().length}`}</span>

          <i onClick={goToPreviousPage}
            className={`prev fas fa-chevron-left ${currentPage === 1 ? 'disabled' : ''}`}
            style={{marginRight: '20px' , cursor: 'pointer'}}></i>

          {`${getPaginationGroup()[0]} - ${getPaginationGroup()[getPaginationGroup().length-1]} of ${data.length}`}
    
          <i onClick={goToNextPage}
            className={`next fas fa-chevron-right ${currentPage === pages ? 'disabled' : ''}`}
            style={{marginLeft: '20px' , cursor: 'pointer'}}></i>
        </div>
      </div>
    </div>
  )
};
