import PropTypes from 'prop-types'

function Paginate({ page, setPage, totalPages }) {
  return (
    <>
      <button type='button' className={page == 1 ? 'btn-hidden' : ''} onClick={() => { setPage(page - 1) }}>
        <svg className='icon-green icon-small'>
          <use xlinkHref='/img/icons.svg#icon-arrow-left'></use>
        </svg>
      </button>
      {
        Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            type='button'
            className={page === i ? 'btn-active' : ''}
            onClick={() => {
              setPage(i);
            }}
          >
            {i}
          </button>
        ))
      }
      <button type='button' className={page == totalPages ? 'btn-hidden' : ''} onClick={() => { setPage(page + 1) }}>
        <svg className='icon-green icon-small'>
          <use xlinkHref='/img/icons.svg#icon-arrow-right'></use>
        </svg>
      </button>
    </>
  )
}

Paginate.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
}

export default Paginate