import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from './Error'

import Loader from '../components/Loader'
import BookingTour from '../components/Tour/BookingTour'
import TourReviews from '../components/Tour/TourReviews'
import TourMap from '../components/Tour/TourMap'
import TourPictures from '../components/Tour/TourPictures'
import TourDescription from '../components/Tour/TourDescription'
import TourHeader from '../components/Tour/TourHeader'

function Tour() {
  const { tourId } = useParams()
  const [loading, setLoading] = useState(true)
  const [tour, setTour] = useState(null)
  const [error, setError] = useState(null)

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
      <Error error={error} />
    )
  }

  return (
    <>
      {/* <TourHeader tour={tour} />

      <TourDescription tour={tour} />

      <TourPictures tour={tour} />

      <TourMap tour={tour} />

      <TourReviews tour={tour} /> */}

      <BookingTour tour={tour} />
    </>
  )
}

export default Tour