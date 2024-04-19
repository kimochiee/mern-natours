import PropTypes from 'prop-types';
import ReviewCard from "./ReviewCard"

function TourReviews({ tour }) {
  return (
    <section className='section-reviews'>
      <div className='reviews'>
        {tour.reviews.map((review, i) => {
          return <ReviewCard key={i} review={review} />
        })}
      </div>
    </section>
  )
}

TourReviews.propTypes = {
  tour: PropTypes.object.isRequired
}

export default TourReviews