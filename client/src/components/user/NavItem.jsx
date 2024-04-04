import PropTypes from 'prop-types';

function NavItem({ link, text, icon, active }) {
  return (
    <li className={`${active ? 'side-nav--active' : ''}`}><a href={link}><svg><use xlinkHref={`img/icons.svg#icon-${icon}`}></use></svg>{text}</a></li>
  )
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}

export default NavItem