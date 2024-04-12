import { useEffect, useState } from "react"

function MyTours() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)

        const res = await fetch(`http://localhost:8000/api/v1/bookings/myBookings`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()

        console.log(data);

        if (!res.ok) {
          setLoading(false)
        }

        if (data.status === 'success') {
          setLoading(false)
          setBookings(data.data.bookings)
        }
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    }

    fetchBookings()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>MyTours</div>
  )
}

export default MyTours