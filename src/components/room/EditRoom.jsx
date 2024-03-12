import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'


const EditRoom = () => {
    const[room, setRoom]=useState({
        photo:null,
        roomType: "",
        roomPrice: ""
    })

    const[successMessage, setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage]=useState("")
    const[imagePreview, setImagePreview]=useState("")
    const{roomId}=useParams()//Lấy được id hiện tại

    const handleImageChange=(e)=>{
        const selectedImage=e.target.files[0]
        setRoom({...room, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    useEffect(()=>{
        fetchRoom()
    },[roomId])

    const fetchRoom=async()=>{
        try{
            const roomData=await getRoomById(roomId)
            setRoom(roomData)
            setImagePreview(roomData.photo)
        }catch(error){
            console.error(error)
        }
    }

    const handleInputChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setRoom({...room,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response=await updateRoom(roomId, room)
            if(response.status===200){
                setSuccessMessage("Room updated successfully !!")
                const updateRoomData=await getRoomById(roomId)
                setRoom(updateRoom)
                setImagePreview(updateRoom.photo)
                setErrorMessage("")
            }else{
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.mesage)
        }
    }

  return (
    <div className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6 ">
						<h2 className="mt-5 mb-2 text-align-center">Edit Room</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<input
                                    type='text'
                                    className='form-control'
                                    id='roomType'
                                    name='roomType'
                                    value={room.roomType}
                                    onChange={handleInputChange}
                                />
							</div>
							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={`data:image/jpeg;base64,${imagePreview}`}
										alt="Preview  room photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-rooms"} className="btn btn-outline-info">
									Back
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Edit Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
  )
}

export default EditRoom