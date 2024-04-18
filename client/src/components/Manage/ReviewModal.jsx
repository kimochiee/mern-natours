import { useState } from "react";

const ReviewModal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <p className="btn-secondary" onClick={toggleModal}>Write Review</p>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="form-modal">
            <h2 className="heading-secondary ma-bt-md undefined">Write Review</h2>
            <form>
              <div className="review_tour_details">
                <img className="review_tour_image" src="https://res.cloudinary.com/dfokabou4/image/upload/v1686588353/natours-tours/tour-5c88fa8cf4afda39709c2951-1686588347579-cover.jpg" alt="The Forest Hiker" />
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
              <div className="form__group right">
                <button type="button" className="btn btn--small btn--red ma-r-sm" onClick={toggleModal}>Cancel</button>
                <button type="submit" className="btn btn--small btn--green false">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewModal