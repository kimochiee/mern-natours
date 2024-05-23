import { useEffect, useState } from 'react'
import TourCard from '../components/TourCard'
import Loader from '../components/Loader'
import env from '../config/env'
import Paginate from '../components/Paginate'

function Home() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const handleSortChange = (e) => {
    const sortvalue = e.target.value

    const sortArray = (array, field, order = 'asc') => {
      return array.sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else if (order === 'desc') {
          return a[field] < b[field] ? 1 : -1;
        } else {
          return 0;
        }
      });
    };

    let sortedTours = [...tours]

    if (sortvalue === 'price') {
      sortedTours = sortArray([...tours], 'price', 'asc');
    } else if (sortvalue === '-price') {
      sortedTours = sortArray([...tours], 'price', 'desc');
    } else if (sortvalue === 'ratingsAverage') {
      sortedTours = sortArray([...tours], 'ratingsAverage', 'asc');
    } else if (sortvalue === '-ratingsAverage') {
      sortedTours = sortArray([...tours], 'ratingsAverage', 'desc');
    }

    setTours(sortedTours)
  }

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${env.API_ROOT}/api/v1/tours?page=${page}`)
        const data = await res.json()

        setTours(data.data)
        setTotalPages(Math.ceil(data.totalDocs / data.maxDocs))
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTours()
  }, [page])

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <main className='main'>
      <div className='overview-actions'>
        <div className='manage-queries'>
          <p>Total: {tours.length}</p>
          <p>Page: {page} ({tours.length} results)</p>
        </div>
        <div className='manage-queries'>
          <div className='input-select-container'>
            <label htmlFor='input-select-label'>Sort: </label>
            <div className='input-select'>
              <svg className='icon-green icon-small icon-down'>
                <use xlinkHref='/img/icons.svg#icon-chevron-down'></use>
              </svg>
              <select name='sort' id='sort' onChange={handleSortChange}>
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
      <div className='paginate'>
        <Paginate page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </main>
  );
}

export default Home