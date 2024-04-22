import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
// import { notify } from "../../utils/notify"
import Loader from "../Loader"
import ReviewItem from "./ReviewItem"

function MyReviews() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  // const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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

    // const fetchReviews = async () => {
    //   try {
    //     setLoading(true)

    //     const res = await fetch(`http://localhost:8000/api/v1/reviews/myReviews?page=${page}`, {
    //       method: 'GET',
    //       credentials: 'include'
    //     })

    //     const data = await res.json()

    //     if (!res.ok) {
    //       setLoading(false)
    //     }

    //     if (data.status === 'success') {
    //       setTotalPages(Math.ceil(data.totalDocs / 6))
    //       setReviews(data.data.reviews)
    //       setLoading(false)
    //     }
    //   } catch (error) {
    //     setLoading(false)
    //     console.log(error.message)
    //   }
    // }

    fetchBookings()
    // fetchReviews()
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
            <ReviewItem key={booking._id} booking={booking} setBookings={setBookings} />
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
              <p className="no-tours">You have no reviews yet. <Link to="/" className="no-tours-link">Book a tour now</Link></p>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default MyReviews