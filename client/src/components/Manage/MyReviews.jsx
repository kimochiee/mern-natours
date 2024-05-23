import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import ReviewItem from './ReviewItem'
import env from '../../config/env'
import Paginate from '../Paginate'
import { UserContext } from '../../context/UserContext'

function MyReviews() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { isTokenExpired } = useContext(UserContext)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${env.API_ROOT}/api/v1/bookings/myBookings?page=${page}`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
          setLoading(false)
          return isTokenExpired()
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
    <div className='user-view__content'>
      <div className='user-view__inner-container'>
        {
          bookings.map(booking => (
            <ReviewItem key={booking._id} booking={booking} setBookings={setBookings} />
          ))
        }
        <div className='paginate'>
          {
            bookings.length > 0 ? (
              <Paginate page={page} setPage={setPage} totalPages={totalPages} />
            ) : (
              <p className='no-tours'>You have no reviews yet. <Link to='/' className='no-tours-link'>Book a tour now</Link></p>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default MyReviews