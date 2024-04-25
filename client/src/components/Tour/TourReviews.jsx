import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard'

function TourReviews({ reviews }) {
  return (
    <section className='section-reviews'>
      <div className='reviews'>
        {reviews.map((review, i) => {
          return <ReviewCard key={i} review={review} />
        })}
      </div>
    </section>
  )
}

TourReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
}

export default TourReviews