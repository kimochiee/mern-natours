import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { localeDate } from '../../utils/localeDate';
import Modal from './Modal';
import { notify } from '../../utils/notify';
import { useState } from 'react';

function ReviewItem({ booking, setBookings }) {
  const [process, setProcess] = useState('post')

  const handleReview = async (rating, review) => {
    try {
      setProcess('posting...')

      const res = await fetch(`http://localhost:8000/api/v1/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tour: booking.tour._id,
          rating,
          review
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setProcess('post')
        return notify('Failed to post review', 'error')
      }

      if (data.status === 'success') {
        setBookings(prevBookings => prevBookings.map(b => b._id === booking._id ? { ...b, review: data.data } : b))
        setProcess('post')
        notify('Review posted successfully', 'success')
      }
    } catch (error) {
      setProcess('post')
      notify(error.message, 'error')
      console.log(error);
    }
  }

  return (
    <div>
      <div className="review_tour_details">
        <img src={`img/tours/${booking.tour.imageCover}`} alt="" className="review_tour_image" />
        <div className="review_tour_description">
          <h3>
            <Link to={`/tour/${booking.tour._id}`} className="review_tour_link">{booking.tour.name}</Link>
          </h3>
          <p className="ma-bt-sm">You booked on {localeDate(booking.createdAt, true)}</p>
          {
            [...Array(5)].map((el, i) => (
              <svg key={i} className={`icon-small icon-rating icon-${booking?.review?.rating || 0 >= i + 1 ? 'active' : 'inactive'}`}>
                <use xlinkHref="/img/icons.svg#icon-star"></use>
              </svg>
            ))
          }
        </div>
        <div className="review_links">
          <Modal text='review' header='write review for this tour' process={process} tour={booking.tour} handle={handleReview} review={booking?.review} />
        </div>
      </div>
      <p className="reviews__text">{booking?.review?.review}</p>
      <div className="line line-small">&nbsp;</div>
    </div>
  )
}

ReviewItem.propTypes = {
  booking: PropTypes.object.isRequired,
  setBookings: PropTypes.func.isRequired
}

export default ReviewItem