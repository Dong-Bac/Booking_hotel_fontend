import React from 'react'
import { useState } from 'react'
import RoomCard from '../room/RoomCard'
import { RoomPaginator } from './RoomPaginator'
import { Button,Row } from 'react-bootstrap'

export const RoomSearchResult = ({results, onClearSearch}) => {

    const[currentPage, setcurrentPage]=useState(1)
    const resultsPerPage=3
    const totalResults=results.length
    const totalPages=Math.ceil(totalResults/resultsPerPage)

    const startIndex=(currentPage-1)*resultsPerPage
    const endIndex=startIndex+resultsPerPage
    const paginatedResults=results.slice(startIndex,endIndex)

    const handlePageChange=(pageNumber)=>{
        setcurrentPage(pageNumber)
    }
  return (
    <>
        {results.length>0?(
            <>
                <h5 className='text-center mt-5'>Search Results</h5>
                <Row>
                    {paginatedResults.map((room)=>{
                        return(
                            <RoomCard key={room.id} room={room}/>
                        )
                    })}
                </Row>
                <Row>
                    {totalPages> results&&(
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                    <Button variant='secondary' onClick={onClearSearch}>
                        Clear Search
                    </Button>
                </Row>
            </>
        ):(
            <></>
        )}
    </>
  )
}
