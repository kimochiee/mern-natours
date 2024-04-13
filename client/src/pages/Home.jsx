import { useEffect, useState } from 'react'

import TourCard from '../components/TourCard'
import Loader from '../components/Loader'

function Home() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [sort, setSort] = useState('')

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)

        const response = await fetch(`http://localhost:8000/api/v1/tours?page=${page}&sort=${sort}`)
        const data = await response.json()

        setTours(data.data)

        setTotalPages(Math.ceil(data.totalDocs / data.maxDocs))
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTours()
  }, [page, sort])

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <main className='main'>
      <div className="overview-actions">
        <div className="manage-queries">
          <p>Total: {tours.length}</p>
          <p>Page: {page} ({tours.length} results)</p>
        </div>
        <div className="manage-queries">
          {/* <div className="filter">
            <p>Filter</p>
          </div> */}
          <div className="input-select-container">
            <label htmlFor="input-select-label">Sort: </label>
            <div className="input-select">
              <svg className='icon-green icon-small icon-down'>
                <use xlinkHref="/img/icons.svg#icon-chevron-down"></use>
              </svg>
              <select name="sort" id="sort" onChange={(e) => { setSort(e.target.value) }}>
                <option value>Newest</option>
                <option value="price">Price Low to High</option>
                <option value="-price">Price High to Low</option>
                <option value="ratingsAverage">Rating Low to High</option>
                <option value="-ratingsAverage">Rating High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='card-container'>
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <h2>No tours available</h2>
        )}
      </div>
      <div className="paginate">
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
      </div>
    </main>
  );
}

export default Home