import React, { useState } from 'react'

export const RoomFilter = ({data, setFilteredData}) => {
    const[filter, setFilter]=useState("")

    const handleSelectChange=(e)=>{
        const selectType=e.target.value
        setFilter(selectType)

        const filteredRooms=data.filter((room)=>{
            room.roomType.toLowerCase().includes(selectType.toLowerCase())
        })
        setFilteredData(filteredRooms)
    }
    const clearFilter=()=>{
        setFilter('')
        setFilteredData(data)
    }

    //const roomTypes=["",... new Set(data.map((room)=>room.roomType))]
  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>
            Filter rooms by type
        </span>
        <select
            className='form-select'
            aria-label='room type filter'
            value={filter}
            onChange={handleSelectChange}
        >
            <option value=''>select a room type to filter....</option>
            {data.map((type,index)=>{
                return(
                    <option key={index}>
                        {type.roomType}
                    </option>
                )
            })}
        </select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}> 
            Clear Filter
        </button>
    </div>
  )
}
