import moment from 'moment'
import React, { useState,useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate=moment(booking.checkInDate)
    const checkOutDate=moment(booking.checkOutDate)
    const numberOfDays=checkOutDate.diff(checkInDate,"days")
    const[isBookingConfirmed,setIsBookingConfirmed]=useState(false)
    const[isProcessingPayment, setIsProcessingPayment]=useState(false)
    const navigate=useNavigate()

    const handleConfirmBooking=()=>{
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
        },3000)
    }

    useEffect(()=>{
        if(isBookingConfirmed){
            navigate("/booking-success")
        }
    },[isBookingConfirmed,navigate])
  return (
    <div className='row'>
        <div className='col-md-6'></div>
        <div className='card card-body mt-5'>
            <h4 className='card-title hotel-color'>Reservation Summary</h4>
            <p>
                Name: <strong>{booking.guestFullName}</strong>
            </p>
            <p>
                Email: <strong>{booking.guestEmail}</strong>
            </p>
            <p>
                Check-in Date: <Strong>{moment(booking.checkInDate)}</Strong>
            </p>
            <p>
                check-out Date: <Strong>{moment(booking.checkOutDate)}</Strong>
            </p>
            <p>
                Number of Days Booked: <Strong>{numberOfDays}</Strong>
            </p>
            <div>
                <h5 className='hotel-color'>Number of Guest</h5>
                <strong>
                    Adult{booking.numOfAdults>1?"s":""}:{booking.numOfAdults}
                </strong>
                <strong>
                    <p>Children: {booking.numOfChildren}</p>
                </strong>
            </div>

            {payment>0?(
                <>
                    <p>
                        Total payment: <Strong>${payment}</Strong>
                    </p>

                    {isFormValid&& !isBookingConfirmed?(
                        <Button variant='success' onClick={handleConfirmBooking}>
                            {isProcessingPayment?(
                                <>
                                <span>
                                    Booking confirmed, redirecting to payment...
                                </span>
                                </>
                            ):(
                                "Comfirm Booking & proceed to payment"
                            )}
                        </Button>
                    ):isBookingConfirmed?(
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
                        </div>
                    ):null}
                </>
            ):(
                <p className='text-danger'>Check-out date must be after check-in date</p>
            )}
        </div>
    </div>
  )
}
