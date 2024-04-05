import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDataFailure, updateUserDataStart, updateUserDataSuccess, updateUserPasswordFailure, updateUserPasswordStart, updateUserPasswordSuccess } from '../../redux/user/userSlice';
import { notify } from '../../utils/notify';

function UserProfile() {
  const { currentNatoursUser, loading } = useSelector((state) => state.user)
  const [userData, setUserData] = useState({
    name: currentNatoursUser.name,
    email: currentNatoursUser.email
  })
  const [userPassword, setUserPassword] = useState({})
  const dispatch = useDispatch()

  const handleChangeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleChangeUserPassword = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmitUserData = async (e) => {
    e.preventDefault()

    if (userData.name === currentNatoursUser.name && userData.email === currentNatoursUser.email) {
      return
    }

    try {
      dispatch(updateUserDataStart())

      // const formData = new FormData()
      // formData.append('name', userData.name)
      // formData.append('email', userData.email)
      // formData.append('photo', e.target.photo.files[0])

      // const res = await fetch('http://localhost:8000/api/v1/users/updateMe', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   credentials: 'include',
      //   body: formData
      // })

      const res = await fetch('http://localhost:8000/api/v1/users/updateMe', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
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

  const handleSubmitUserPassword = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateUserPasswordStart())

      const res = await fetch('http://localhost:8000/api/v1/users/updateMyPassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userPassword)
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
        return dispatch(updateUserDataFailure(data.message))
      }

      if (data.status === 'success') {
        notify('User password updated successfully', 'success')
        dispatch(updateUserPasswordSuccess())
      }
    } catch (error) {
      console.log(error);
      notify(error.message, 'error')
      dispatch(updateUserPasswordFailure(error.message))
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
            <img src={`img/users/${currentNatoursUser.photo}`} alt='User photo' className='form__user-photo' />
            <input
              type='file'
              id='photo'
              name='photo'
              className='form__upload'
              accept='image/*'
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
      <div className='line'>&nbsp;</div>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>Password change</h2>
        <form className='form form-user-data' onSubmit={handleSubmitUserPassword}>
          <div className='form__group'>
            <label htmlFor='currentPassword' className='form__label'>Current password</label>
            <input
              type='password'
              id='currentPassword'
              name='currentPassword'
              className='form__input'
              placeholder='********'
              minLength={8}
              required
              onChange={handleChangeUserPassword}
            />
          </div>
          <div className='form__group'>
            <label htmlFor='password' className='form__label'>New password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='form__input'
              placeholder='********'
              minLength={8}
              required
              onChange={handleChangeUserPassword}
            />
          </div>
          <div className='form__group .ma-bt-lg'>
            <label htmlFor='passwordConfirm' className='form__label'>Confirm password</label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              className='form__input'
              placeholder='********'
              minLength={8}
              required
              onChange={handleChangeUserPassword}
            />
          </div>
          <div className='form__group right'>
            {loading ?
              <button className='btn btn--small btn--green' disabled>Saving...</button>
              :
              <button className='btn btn--small btn--green'>Save password</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile