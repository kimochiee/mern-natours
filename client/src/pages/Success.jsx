import { useEffect } from 'react'
import Loader from '../components/Loader'
import { notify } from '../utils/notify'
import { useNavigate } from 'react-router-dom'
import env from '../config/env'

function Success() {
  const navigate = useNavigate()

  useEffect(() => {
    const createBookingCheckout = async () => {
      try {
        const session_id = new URLSearchParams(window.location.search).get('session_id')

        const res = await fetch(`${env.API_ROOT}/api/v1/bookings/createBookingCheckout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ session_id })
        })

        const data = await res.json()

        if (!res.ok) {
          notify(data.message, 'error')
          return navigate('/')
        }

        if (data.status === 'success') {
          notify('Booking successful!', 'success')
          return navigate('/account?tab=my-tours')
        }
      } catch (error) {
        notify(error.message, 'error')
        console.log(error)
        navigate('/')
      }
    }

    createBookingCheckout()
  }, [])

  return (
    <Loader />
  )
}

export default Success