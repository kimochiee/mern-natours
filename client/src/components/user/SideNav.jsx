import { useEffect, useState } from 'react';
import NavItem from './NavItem'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

function SideNav() {
  const { currentNatoursUser } = useSelector((state) => state.user)
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location])

  return (
    <nav className='user-view__menu'>
      <ul className='side-nav'>
        <NavItem link='/account?tab=profile' text='My Profile' icon='settings' active={tab === 'profile' || !tab} />
        <NavItem link='/account?tab=security' text='Security' icon='lock' active={tab === 'security' || !tab} />
        <NavItem link='/account?tab=my-tours' text='My Tours' icon='briefcase' active={tab === 'my-tours' || !tab} />
        <NavItem link='/account?tab=my-reviews' text='My Reviews' icon='star' active={tab === 'my-reviews' || !tab} />
      </ul>
      {currentNatoursUser.role === 'admin' && (<>
        <div className='admin-nav'>
          <h5 className='admin-nav__heading'>Admin</h5>
          <ul className='side-nav'>
            <NavItem link='/account?tab=manage-tours' text='Manage Tours' icon='map' active={false} />
            <NavItem link='/account?tab=manage-users' text='Manage Users' icon='users' active={false} />
            <NavItem link='/account?tab=manage-reviews' text='Manage Reviews' icon='star' active={false} />
            <NavItem link='/account?tab=manage-bookings' text='Manage Bookings' icon='calendar' active={false} />
          </ul>
        </div>
      </>)}
    </nav>
  )
}

export default SideNav