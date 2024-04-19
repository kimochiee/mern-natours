import PropTypes from 'prop-types';
import MapboxGlMap from './MapboxGlMap';

function TourMap({ tour }) {
  return (
    <section className='section-map'>
      <MapboxGlMap data={tour.locations} />
    </section>
  )
}

TourMap.propTypes = {
  tour: PropTypes.object.isRequired
}

export default TourMap