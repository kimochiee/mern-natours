import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../Loader'
import BookingItem from './BookingItem'
import env from '../../config/env'
import Paginate from '../Paginate'

function MyTours() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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
            <BookingItem key={booking._id} booking={booking} setBookings={setBookings} />
          ))
        }
        <div className='paginate'>
          {
            bookings.length > 0 ? (
              <Paginate page={page} setPage={setPage} totalPages={totalPages} />
            ) : (
              <p className='no-tours'>You have no bookings yet. <Link to='/' className='no-tours-link'>Book a tour now</Link></p>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default MyTours