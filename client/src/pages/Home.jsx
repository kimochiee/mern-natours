import { useEffect, useState } from "react"

import TourCard from "../components/TourCard"
import { setTitle } from "../utils/setTitle"

function Home() {
  setTitle("Home")

  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)

        const response = await fetch("http://localhost:8000/api/v1/tours")
        const data = await response.json()

        setTours(data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTours()
  }, [])

  if (loading) {
    return (
      <main className="main">
        <div className="card-container">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="card-container">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <h2>No tours available</h2>
        )}
      </div>
    </main>
  );
}

export default Home