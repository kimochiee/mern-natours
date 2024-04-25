import PropTypes from 'prop-types'
import { useState } from 'react'

const Modal = ({ text, header, process, tour, handle, review }) => {
  const [modal, setModal] = useState(false)
  const [stars, setStars] = useState(review?.rating || 0)
  const [textReview, setTextReview] = useState(review?.review || '')
  const [hover, setHover] = useState(null)

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleParentFunc = async () => {
    if (text == 'review') {
      await handle(stars, textReview)
      setStars(0)
    } else if (text == 'edit review') {
      await handle(stars, textReview)
    } else {
      await handle()
    }

    toggleModal()
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <p className={`btn-secondary ${text == 'delete review' ? 'secondary--red' : ''}`} onClick={toggleModal}>{text}</p>

      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='form-modal'>
            <h2 className='heading-secondary ma-bt-md undefined'>{header}</h2>
            {
              text == 'review' && (
                <>
                  <div className='review_tour_details'>
                    <img className='review_tour_image' src={`img/tours/${tour.imageCover}`} alt={tour.name} />
                    <div className='review_tour_description'>
                      <h3>
                        <a className='review_tour_link' href={`/tour/${tour._id}`}>{tour.name}</a>
                      </h3>
                      <div className='input-rating'>
                        {
                          [...Array(5)].map((el, i) => (
                            <button
                              key={i}
                              type='button'
                              className='off'
                              onClick={() => setStars(i + 1)}
                              onMouseEnter={() => setHover(i + 1)}
                              onMouseLeave={() => setHover(null)}
                            >
                              <svg className={`icon-small icon-rating icon-${(i + 1) <= (hover || stars) ? 'active' : 'inactive'}`}>
                                <use xlinkHref='/img/icons.svg#icon-star'></use>
                              </svg>
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className='review_text_container'>
                    <textarea className='review_text' name='review' cols='57' rows='10' placeholder='Tell us about your trip . . . .' onChange={(e) => setTextReview(e.target.value.trim())}></textarea>
                  </div>
                </>
              )
            }
            {
              text == 'edit review' && (
                <>
                  <div className='review_tour_details'>
                    <img className='review_tour_image' src={`img/tours/${tour.imageCover}`} alt={tour.name} />
                    <div className='review_tour_description'>
                      <h3>
                        <a className='review_tour_link' href={`/tour/${tour._id}`}>{tour.name}</a>
                      </h3>
                      <div className='input-rating'>
                        {
                          [...Array(5)].map((el, i) => (
                            <button
                              key={i}
                              type='button'
                              className='off'
                              onClick={() => setStars(i + 1)}
                              onMouseEnter={() => setHover(i + 1)}
                              onMouseLeave={() => setHover(null)}
                            >
                              <svg className={`icon-small icon-rating icon-${(i + 1) <= (hover || stars) ? 'active' : 'inactive'}`}>
                                <use xlinkHref='/img/icons.svg#icon-star'></use>
                              </svg>
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className='review_text_container'>
                    <textarea className='review_text' name='review' cols='57' rows='10' placeholder='Tell us about your trip . . . .' onChange={(e) => setTextReview(e.target.value.trim())}>{textReview}</textarea>
                  </div>
                </>
              )
            }
            <div className='form__group center'>
              <button type='button' className='btn btn--small btn--red ma-r-sm' onClick={toggleModal}>Cancel</button>
              <button type='submit' className='btn btn--small btn--green false' onClick={handleParentFunc}>{process}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  process: PropTypes.string.isRequired,
  tour: PropTypes.object.isRequired,
  handle: PropTypes.func.isRequired,
  review: PropTypes.object
}

export default Modal