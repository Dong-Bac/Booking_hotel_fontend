import React from 'react'

export const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers=[]
    for(let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className="pagination d-flex justify-content-center">
        <li className="page-item disabled" >
                <a className="page-link" disabled>Previous</a>
            </li>
            {pageNumbers.map((pageNumber)=>{
                return(
                    <li key={pageNumber} className={`page-item ${pageNumber===currentPage?'active':''}`} aria-current="page">
                        <button onClick={()=>onPageChange(pageNumber)} className="page-link">
                            {pageNumber}
                         </button>
                    </li>
                )
            })}
            <li className="page-item">
                <a className="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
    
  )
}
