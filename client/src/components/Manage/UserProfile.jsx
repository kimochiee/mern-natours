import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDataFailure, updateUserDataStart, updateUserDataSuccess, } from '../../redux/user/userSlice'
import { notify } from '../../utils/notify'
import env from '../../config/env'

function UserProfile() {
  const { currentNatoursUser, loading } = useSelector((state) => state.user)
  const [userData, setUserData] = useState({
    name: currentNatoursUser.name,
    email: currentNatoursUser.email
  })
  const dispatch = useDispatch()

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

    if (userData.name === currentNatoursUser.name && userData.email === currentNatoursUser.email && !userData.photo) {
      return
    }

    try {
      dispatch(updateUserDataStart())

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
        return dispatch(updateUserDataFailure(data.message))
      }

      if (data.status === 'success') {
        notify('User data updated successfully', 'success')
        dispatch(updateUserDataSuccess(data.data.user))
      }
    } catch (error) {
      notify(error.message, 'error')
      dispatch(updateUserDataFailure(error.message))
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
              defaultValue={currentNatoursUser.name}
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
              defaultValue={currentNatoursUser.email}
              required
              onChange={handleChangeUserData}
            />
          </div>
          <div className='form__group form__photo-upload'>
            <img
              src={currentNatoursUser.photo.startsWith('http') ? currentNatoursUser.photo : `img/users/${currentNatoursUser.photo}`}
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
            {loading ?
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