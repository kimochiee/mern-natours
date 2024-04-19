import PropTypes from 'prop-types';

function TourPictures({ tour }) {
  return (
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
  )
}

TourPictures.propTypes = {
  tour: PropTypes.object.isRequired
}

export default TourPictures