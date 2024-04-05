import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import SideNav from '../components/User/SideNav';
import UserProfile from '../components/Manage/UserProfile';

function Account() {
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
    <main className='main'>
      <div className='user-view'>
        <SideNav />

        {tab === 'profile' && <UserProfile />}
      </div>
    </main>
  )
}

export default Account