import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { notify } from '../../utils/notify'
import env from '../../config/env'

function UserProfile() {
  const { user, setUser, isTokenExpired } = useContext(UserContext)
  const [updating, setUpdating] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email
  })

  const handleChangeUserData = (e) => {
    if (e.target.name === 'photo') {
      setUserData({
        ...userData,
        photo: e.target.files[0]
      })
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value.trim()
      })
    }
  }

  const handleSubmitUserData = async (e) => {
    e.preventDefault()

    if (userData.name === user.name && userData.email === user.email && !userData.photo) {
      return
    }

    try {
      setUpdating(true)

      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('photo', userData.photo)

      const res = await fetch(`${env.API_ROOT}/api/v1/users/updateMe`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
        setUpdating(false)
        return isTokenExpired()
      }

      if (data.status === 'success') {
        notify('User data updated successfully', 'success')
        setUser(data.data.user)
        setUpdating(false)
      }
    } catch (error) {
      notify(error.message, 'error')
      setUpdating(false)
      console.log(error);
    }
  }

  return (
    <div className='user-view__content'>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
        <form className='form form-user-data' onSubmit={handleSubmitUserData}>
          <div className='form__group'>
            <label htmlFor='name' className='form__label'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              className='form__input'
              defaultValue={user.name}
              required
              onChange={handleChangeUserData}
            />
          </div>
          <div className='form__group'>
            <label htmlFor='email' className='form__label'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              className='form__input'
              defaultValue={user.email}
              required
              onChange={handleChangeUserData}
            />
          </div>
          <div className='form__group form__photo-upload'>
            <img
              src={user.photo.startsWith('http') ? user.photo : `img/users/${user.photo}`}
              alt='User photo'
              className='form__user-photo'
            />
            <input
              type='file'
              id='photo'
              name='photo'
              className='form__upload'
              accept='image/*'
              onChange={handleChangeUserData}
            />
            <label htmlFor='photo'>choose new photo</label>
          </div>
          <div className='form__group right'>
            {updating ?
              <button className='btn btn--small btn--green' disabled>Saving...</button>
              :
              <button className='btn btn--small btn--green'>Save settings</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile