import PropTypes from 'prop-types';
import { useState } from "react";

const ReviewModal = ({ text, header, process, tour, handle }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleParentFunc = async () => {
    await handle()
    toggleModal()
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <p className="btn-secondary" onClick={toggleModal}>{text}</p>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="form-modal">
            <h2 className="heading-secondary ma-bt-md undefined">{header}</h2>
            {
              text == 'review' && (
                <>
                  <div className="review_tour_details">
                    <img className="review_tour_image" src={`img/tours/${tour.imageCover}`} alt={tour.name} />
                    <div className="review_tour_description">
                      <h3>
                        <a className="review_tour_link" href="/tours/5c88fa8cf4afda39709c2951">The Forest Hiker</a>
                      </h3>
                      <p>You visited on October 5, 2023</p>
                      <div className="input-rating">
                        <button type="button" className="off">
                          <svg className="icon-small icon-rating icon-inactive">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                          </svg>
                        </button>
                        <button type="button" className="off">
                          <svg className="icon-small icon-rating icon-inactive">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                          </svg>
                        </button>
                        <button type="button" className="off">
                          <svg className="icon-small icon-rating icon-inactive">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                          </svg>
                        </button>
                        <button type="button" className="off">
                          <svg className="icon-small icon-rating icon-inactive">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                          </svg>
                        </button>
                        <button type="button" className="off">
                          <svg className="icon-small icon-rating icon-inactive">
                            <use xlinkHref="/img/icons.svg#icon-star"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="review_text_container">
                    <textarea className="review_text" name="review" cols="57" rows="10" placeholder="Tell us about your trip . . . ."></textarea>
                  </div>
                </>
              )
            }
            <div className="form__group center">
              <button type="button" className="btn btn--small btn--red ma-r-sm" onClick={toggleModal}>Cancel</button>
              <button type="submit" className="btn btn--small btn--green false" onClick={handleParentFunc}>{process}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ReviewModal.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  process: PropTypes.string.isRequired,
  tour: PropTypes.object.isRequired,
  handle: PropTypes.func.isRequired
}

export default ReviewModal