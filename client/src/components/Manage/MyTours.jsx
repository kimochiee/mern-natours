import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { notify } from "../../utils/notify"
import Loader from "../Loader"
import { localeDate } from "../../utils/localeDate"

function MyTours() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [refundState, setRefundState] = useState('refund')

  const handleRefund = async (id) => {
    try {
      setRefundState('processing...')

      const res = await fetch(`http://localhost:8000/api/v1/bookings/refund/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        return notify(data.message, 'error')
      }

      if (data.status === 'success') {
        setRefundState('refund')
        notify('Refund successful!', 'success')
        setBookings(bookings.filter(booking => booking._id !== id))
      }
    } catch (error) {
      setRefundState('refund')
      notify(error.message, 'error')
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)

        const res = await fetch(`http://localhost:8000/api/v1/bookings/myBookings?page=${page}`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
          setLoading(false)
        }

        if (data.status === 'success') {
          setTotalPages(Math.ceil(data.totalDocs / 6))
          setBookings(data.data.bookings)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    }

    fetchBookings()
  }, [page])

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="user-view__content">
      <div className="user-view__inner-container">
        {
          bookings.map(booking => (
            <div key={booking._id}>
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
                    {booking.price}
                    <span className="booking_status booking_paid">
                      {booking.paid ? 'Paid' : 'Refunded'}</span>
                  </p>
                </div>
                <div className="review_links">
                  <p className="btn-secondary" onClick={() => handleRefund(booking._id)}>{refundState}</p>
                </div>
              </div>
              <div className="line line-small">&nbsp;</div>
            </div>
          ))
        }
        <div className="paginate">
          {
            bookings.length > 0 ? (
              <>
                <button type="button" className={page == 1 ? 'btn-hidden' : ''} onClick={() => { setPage(page - 1) }}>
                  <svg className='icon-green icon-small'>
                    <use xlinkHref="/img/icons.svg#icon-arrow-left"></use>
                  </svg>
                </button>
                {
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                    <button
                      key={i}
                      type="button"
                      className={page === i ? 'btn-active' : ''}
                      onClick={() => {
                        setPage(i);
                      }}
                    >
                      {i}
                    </button>
                  ))
                }
                <button type="button" className={page == totalPages ? 'btn-hidden' : ''} onClick={() => { setPage(page + 1) }}>
                  <svg className='icon-green icon-small'>
                    <use xlinkHref="/img/icons.svg#icon-arrow-right"></use>
                  </svg>
                </button>
              </>
            ) : (
              <p className="no-tours">You have no bookings yet. <Link to="/" className="no-tours-link">Book a tour now</Link></p>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default MyTours