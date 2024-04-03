import PropTypes from 'prop-types';

function OverviewBox({ label, text, icon }) {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`img/icons.svg#icon-${icon}`}></use>
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  )
}

OverviewBox.propTypes = {
  label: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
};

export default OverviewBox