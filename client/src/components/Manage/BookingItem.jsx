import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { localeDate } from '../../utils/localeDate';
import { notify } from '../../utils/notify';

import ReviewModal from "./ReviewModal"
import BookingDetailsItem from './BookingDetailsItem';

function BookingItem({ booking, setBookings }) {
  const [processing, setProcessing] = useState('confirm')

  let daysRemaining
  if (Date.now() > new Date(booking.tourStartDate).getTime() + booking.tour.duration * 24 * 60 * 60 * 1000) {
    daysRemaining = 'Tour over'
  } else if (Date.now() > new Date(booking.tourStartDate).getTime()) {
    daysRemaining = 'Tour ongoing'
  } else {
    daysRemaining = Math.ceil((new Date(booking.tourStartDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
  }

  const handleRefund = async () => {
    if (booking.status == 'refunded') {
      return notify('Booking already refunded', 'error')
    }

    if (daysRemaining == 'Tour over') {
      return notify('Tour is over, refund not possible', 'error')
    }

    if (daysRemaining == 'Tour ongoing') {
      return notify('Tour is ongoing, refund not possible', 'error')
    }

    try {
      setProcessing('processing...')

      const res = await fetch(`http://localhost:8000/api/v1/bookings/refund/${booking._id}`, {
        method: 'PATCH',
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        setProcessing('confirm')
        return notify(data.message, 'error')
      }

      if (data.status === 'success') {
        setBookings(prevBookings => prevBookings.map(b => b._id === data.data.booking._id ? data.data.booking : b))
        setProcessing('confirm')
        notify('Refund successful!', 'success')
      }
    } catch (error) {
      setProcessing('confirm')
      notify(error.message, 'error')
      console.log(error)
    }
  }

  return (
    <div>
      <p className="sub-heading ma-bt-md">* Full refund if cancel booking before 30 days of tour</p>
      <div className="review_tour_details">
        <img src={`img/tours/${booking.tour.imageCover}`} alt="" className="review_tour_image" />
        <div className="review_tour_description">
          <h3>
            <Link to={`/tour/${booking.tour._id}`} className="review_tour_link">{booking.tour.name}</Link>
          </h3>
          <p className="ma-bt-sm">You booked on {localeDate(booking.createdAt, true)}</p>
          <p className="booking-price">
            Total: $
            {booking.price * booking.tickets}
            <span className="booking_status booking_paid">
              {booking.status}
            </span>
          </p>
        </div>
        <div className="review_links">
          <ReviewModal text='refund' header='do you want to refund this booking?' process={processing} tour={booking.tour} handle={handleRefund} />
        </div>
      </div>
      <div className="booking-status-container">
        <BookingDetailsItem text='Start date' value={localeDate(booking.tourStartDate, true)} />
        <BookingDetailsItem text='Tickets' value={`${booking.tickets} ($${booking.price} per person)`} />
        <BookingDetailsItem text='Tour Status' value={`${daysRemaining}${isNaN(daysRemaining) ? '' : ' days remaining'}`} />
        <BookingDetailsItem text='Refundable' value={daysRemaining > 30 ? 'Yes' : 'No'} />
      </div>
      <div className="line line-small">&nbsp;</div>
    </div>
  )
}

BookingItem.propTypes = {
  booking: PropTypes.object.isRequired,
  setBookings: PropTypes.func.isRequired
}

export default BookingItem