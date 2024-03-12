import axios from "axios";

export const api=axios.create({
    baseURL:"http://localhost:8080"
})

export const getHeader=()=>{
    const token=localStorage.getItem("token")
    return{
        'Authorization': 'Bearer your_token_here',
  		'Content-Type': 'application/json' 
    }
}
//This function for auth
export async function registerUser(registration){
    try{
        const response=await api.post('/auth/register-user', registration)
        return response.data
    }catch(error){
        if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
    }
}

export async function loginUser(login){
    try{
        const respone=await api.post("/auth/login",login)
        if(respone.status>=200&& respone.status<300){
            return respone.data
        }else{
            null
        }
    }catch(error){
        console.error(error)
        return null
    }
}


// This function add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const response = await api.post("/api/rooms/add/new-room", formData,{
        headers:getHeader()
    })
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

// This function get add roomType from database
export async function getRoomTypes(){
    try{
        const response = await api.get("/api/rooms/room-types")
        return response.data
    }catch(error){
        throw new Error("Error fetching room types")
    }

    
}

//This function get all rooms from database
export async function getAllRooms(){
    try{

        const result=await api.get("api/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching get rooms")
    }
}

//This function delete room by roomId from database
export async function deleteRoom(roomId){
    try{
        const result=await api.delete(`api/rooms/delete/room/${roomId}`)
    }catch(error){
        throw new Error("Error fetching delete room by id")
    }
}

//This function update room
export async function updateRoom(roomId, roomData){
    const formData=new formData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response= await api.put(`/api/rooms/update/${roomId}, formData`)

    return response
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	console.log(roomId)
	try {
		const result = await api.get(`api/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    try {
        const result=await api.get(`api/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function getUserProfile(userId, token){
    try{
        const response=await api.get(`api/users/profile/${userId}`,{
            headers:getHeader()
        })
        return response.data
    }catch(error){
        throw new Error(`Error fetching user ${error.message}`)
    }
}

// This is the function to get a single user
export async function getUser(userId, token){
    try {
		const response = await api.get(`/api/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

// This is the function to delete a user
export async function deleteUser(userId){
    try{
        const respone= await api.delete(`/api/users/delete/${userId}`,{
            headers:getHeader()
        })
        return respone.data
    }catch(error){
        return error.message
    }
}

/* This is the function to get user bookings by the email */
export async function getBookingsByUserEmail(userId, token) {
	try {
		const response = await api.get(`/api/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}
/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId) {
	try {
		const response = await api.get(`/api/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/api/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/api/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/api/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/api/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}