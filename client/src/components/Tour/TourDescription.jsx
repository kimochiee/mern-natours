import PropTypes from 'prop-types';
import OverviewBox from './OverviewBox';
import { localeDate } from '../../utils/localeDate';

function TourDescription({ tour }) {
  return (
    <section className='section-description'>
      <div className='overview-box'>
        <div>
          <div className='overview-box__group'>
            <h2 className='heading-secondary ma-bt-lg'>Quick facts</h2>
            <OverviewBox label='Next date' text={localeDate(tour.startDates[0].dateValue)} icon='calendar' />
            <OverviewBox label={'Difficulty'} text={tour.difficulty} icon={'trending-up'} />
            <OverviewBox label={'Participants'} text={`${tour.maxGroupSize} people`} icon={'user'} />
            <OverviewBox label={'Rating'} text={`${tour.ratingsAverage} / 5`} icon={'star'} />
          </div>

          <div className='overview-box__group'>
            <h2 className='heading-secondary ma-bt-lg'>Your tour guides</h2>

            {tour.guides.map((guide, i) => {
              return <div key={i} className='overview-box__detail'>
                <img
                  src={`img/users/${guide.photo}`}
                  alt={`${guide.name}`}
                  className='overview-box__img'
                />
                <span className='overview-box__label'>{guide.role}</span>
                <span className='overview-box__text'>{guide.name}</span>
              </div>
            })}

          </div>
        </div>
      </div>

      <div className='description-box'>
        <h2 className='heading-secondary ma-bt-lg'>About {tour.name} tour</h2>
        {tour.description.split('\n').map((text, i) => <p key={i} className='description__text'>{text}</p>)}
      </div>
    </section>
  )
}

TourDescription.propTypes = {
  tour: PropTypes.object.isRequired
}

export default TourDescription