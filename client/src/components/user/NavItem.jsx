import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavItem({ link, text, icon, active }) {
  return (
    <li className={`${active ? 'side-nav--active' : ''}`}><Link to={link}><svg><use xlinkHref={`img/icons.svg#icon-${icon}`}></use></svg>{text}</Link></li>
  )
}

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}

export default NavItem