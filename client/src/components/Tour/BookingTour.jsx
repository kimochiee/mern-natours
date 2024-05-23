import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { notify } from '../../utils/notify'
import { Link } from 'react-router-dom'
import { localeDate } from '../../utils/localeDate'
import env from '../../config/env'

function BookingTour({ tour }) {
  const [processing, setProcessing] = useState(false)
  const [tickets, setTickets] = useState(0)
  const [date, setDate] = useState('')
  const { user, isTokenExpired } = useContext(UserContext)

  const handleBookTour = async () => {
    try {
      setProcessing(true)

      const res = await fetch(`${env.API_ROOT}/api/v1/bookings/checkout-session/${tour._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, tickets })
      })

      const data = await res.json()

      if (!res.ok) {
        setProcessing(false)
        notify(data.message, 'error')
        return isTokenExpired()
      }

      if (data.status === 'success') {
        setProcessing(false)

        return window.location.replace(data.session.url)
      }
    } catch (error) {
      setProcessing(false)
      notify(error.message, 'error')
      console.log(error)
    }
  }

  const handleTickets = (e) => {
    if (!date) return notify('Please select a date', 'error')

    if (e.target.textContent === '+') {
      if (tickets == (tour.maxGroupSize - tour.startDates.find(d => d.dateValue === date).participants)) {
        return notify('No more tickets available', 'error')
      }

      setTickets(tickets + 1)
    } else {
      if (tickets > 0) {
        setTickets(tickets - 1)
      }
    }
  }

  return (
    <section className='section-cta'>
      <div className='cta'>
        <div className='cta__img cta__img--logo'>
          <img src='img/logo-white.png' alt='Natours logo' className='' />
        </div>
        <img src={`img/tours/${tour.images[1]}`} alt='' className='cta__img cta__img--1' />
        <img src={`img/tours/${tour.images[2]}`} alt='' className='cta__img cta__img--2' />
        <div className='tour_dates'>
          <div className='dates_container'>
            <h3>Available Dates</h3>
            {
              tour.startDates.map(date => {
                return <p key={date._id}>{localeDate(date.dateValue, true)}</p>
              })
            }
          </div>
          <div className='dates_container'>
            <h3>Tickets Available</h3>
            {
              tour.startDates.map(date => {
                return <p key={date._id}>{tour.maxGroupSize - date.participants}</p>
              })
            }
          </div>
          <div className='vertical-line'>&nbsp;</div>
          <form className='form_booking'>
            <div className='date_input'>
              <svg className='icon-green icon-small icon-down booking-down'>
                <use xlinkHref='/img/icons.svg#icon-chevron-down'></use>
              </svg>
              <select name='date' onChange={(e) => {
                setDate(e.target.value)
                setTickets(0)
              }}>
                <option value=''>CHOOSE DATE:</option>
                {
                  tour.startDates.map(date => {
                    return <option key={date._id} value={date.dateValue}>{localeDate(date.dateValue, true)}</option>
                  })
                }
              </select>
            </div>
            <div className='booking_tickets'>
              <button type='button' onClick={handleTickets} disabled={date && tour.maxGroupSize - tour.startDates.find(d => d.dateValue === date).participants == 0}>-</button>
              <p>{tickets}</p>
              <button type='button' onClick={handleTickets} disabled={date && tour.maxGroupSize - tour.startDates.find(d => d.dateValue === date).participants == 0}>+</button>
            </div>
            <div className='center'>
              {
                user ?
                  <button type='button' className='btn btn--green btn--large ma-t-lg false' disabled={!date || tickets == 0} onClick={handleBookTour}>
                    {processing ? 'Processing...' : 'Book tour now!'}
                  </button>
                  :
                  <Link to='/sign-in' className='btn btn--green span-all-rows ma-t-lg'>Log in to book tour</Link>
              }
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

BookingTour.propTypes = {
  tour: PropTypes.object.isRequired
}

export default BookingTour