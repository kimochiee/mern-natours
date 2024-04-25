import PropTypes from 'prop-types';

function ReviewCard({ review }) {
  return (
    <div className='reviews__card'>
      <div className='reviews__avatar'>
        <img
          src={review.user.photo.startsWith('http') ? review.user.photo : `img/users/${review.user.photo}`}
          alt={review.user.name}
          className='reviews__avatar-img'
        />
        <h6 className='reviews__user'>{review.user.name}</h6>
      </div>
      <p className='reviews__text'>{review.review}</p>
      <div className='reviews__rating'>
        {[1, 2, 3, 4, 5].map((star, i) => {
          return (
            <svg key={i} className={`reviews__star reviews__star--${review.rating >= star ? 'active' : 'inactive'}`}>
              <use xlinkHref='img/icons.svg#icon-star'></use>
            </svg>
          )
        })}
      </div>
    </div>
  )
}

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard