import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { localeDate } from '../utils/localeDate'
import { useSelector } from 'react-redux'

import OverviewBox from '../components/Tour/OverviewBox'
import ReviewCard from '../components/Tour/ReviewCard'
import MapboxGlMap from '../components/Tour/MapboxGlMap'
import Loader from '../components/Loader'
import { notify } from '../utils/notify'

function Tour() {
  const { currentNatoursUser } = useSelector((state) => state.user)
  const { tourId } = useParams()
  const [processing, setProcessing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState(null)
  const [error, setError] = useState(null)

  const handleBookTour = async () => {
    try {
      setProcessing(true)

      const res = await fetch(`http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`, {
        credentials: 'include'
      })

      const data = await res.json()
      console.log(data);

      if (!res.ok) {
        setProcessing(false)
        return notify(data.message, 'error')
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

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:8000/api/v1/tours/${tourId}`)

        const data = await res.json()

        if (!res.ok) {
          setError('No tour found with that ID')
          setLoading(false)
        }

        if (data.status === 'success') {
          setTour(data.data)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchTour()
  }, [tourId])

  if (loading) {
    return (
      <Loader />
    )
  }

  if (error) {
    return (
      <main className='main'>
        <div className='error'>
          <div className='error__title'>
            <h2 className='heading-secondary heading-secondary--error'>Uh oh! Something went wrong! </h2>
            <h2 className='error__emoji'>😢 🤯</h2>
          </div>
          <div className='error__msg'>{error}</div>
        </div>
      </main>
    )
  }

  return (
    <>
      <section className='section-header'>
        <div className='header__hero'>
          <div className='header__hero-overlay'>&nbsp;</div>
          <img className='header__hero-img' src={`img/tours/${tour.imageCover}`} alt={`${tour.name}`} />
        </div>
        <div className='heading-box'>
          <h1 className='heading-primary'>
            <span>{tour.name}</span>
          </h1>
          <div className='heading-box__group'>
            <div className='heading-box__detail'>
              <svg className='heading-box__icon'>
                <use xlinkHref='img/icons.svg#icon-clock'></use>
              </svg>
              <span className='heading-box__text'>{tour.duration} days</span>
            </div>
            <div className='heading-box__detail'>
              <svg className='heading-box__icon'>
                <use xlinkHref='img/icons.svg#icon-map-pin'></use>
              </svg>
              <span className='heading-box__text'>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className='section-description'>
        <div className='overview-box'>
          <div>
            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
              <OverviewBox label='Next date' text={localeDate(tour.startDates[0], 'en-us')} icon='calendar' />
              <OverviewBox label={'Difficulty'} text={tour.difficulty} icon={'trending-up'} />
              <OverviewBox label={'Participants'} text={`${tour.maxGroupSize} people`} icon={'user'} />
              <OverviewBox label={'Rating'} text={`${tour.ratingsAverage} / 5`} icon={'star'} />
            </div>

            <div className='overview-box__group'>
              <h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>

              {tour.guides.map((guide, i) => {
                return <div key={i} className='overview-box__detail'>
                  <img
                    src={`img/users/${guide.photo}`}
                    alt={`${guide.name}`}
                    className='overview-box__img'
                  />
                  <span className='overview-box__label'>{guide.role}</span>
                  <span className='overview-box__text'>{guide.name}</span>
                </div>
              })}

            </div>
          </div>
        </div>

        <div className='description-box'>
          <h2 className='heading-secondary ma-bt-lg'>About {tour.name} tour</h2>
          {tour.description.split('\n').map((text, i) => <p key={i} className='description__text'>{text}</p>)}
        </div>
      </section>

      <section className='section-pictures'>
        {tour.images.map((image, i) => {
          return (
            <div key={i} className='picture-box'>
              <img
                className={`picture-box__img picture-box__img--${i + 1}`}
                src={`img/tours/${image}`}
                alt={`${tour.name} ${i + 1}`}
              />
            </div>
          )
        })}
      </section>

      <section className='section-map'>
        <MapboxGlMap data={tour.locations} />
      </section>

      <section className='section-reviews'>
        <div className='reviews'>
          {tour.reviews.map((review, i) => {
            return <ReviewCard key={i} review={review} />
          })}
        </div>
      </section>

      <section className='section-cta'>
        <div className='cta'>
          <div className='cta__img cta__img--logo'>
            <img src='img/logo-white.png' alt='Natours logo' className='' />
          </div>
          <img src={`img/tours/${tour.images[1]}`} alt='' className='cta__img cta__img--1' />
          <img src={`img/tours/${tour.images[2]}`} alt='' className='cta__img cta__img--2' />

          <div className='cta__content'>
            <h2 className='heading-secondary'>What are you waiting for?</h2>
            <p className='cta__text'>
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            {
              currentNatoursUser ?
                <button className='btn btn--green span-all-rows' onClick={handleBookTour}>
                  {processing ? 'Processing...' : 'Book tour now!'}
                </button>
                :
                <Link to='/sign-in' className='btn btn--green span-all-rows'>Log in to book tour</Link>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Tour