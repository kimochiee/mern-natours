import PropTypes from 'prop-types'

function BookingDetailsItem({ text, value }) {
  return (
    <div className='bd-container'>
      <svg className='icon-green icon-small'>
        <use xlinkHref='/img/icons.svg#icon-chevron-right'></use>
      </svg>
      <p><span>{text}:</span> {value}</p>
    </div>
  )
}

BookingDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default BookingDetailsItem