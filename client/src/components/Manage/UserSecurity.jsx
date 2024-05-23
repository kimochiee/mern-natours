import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { notify } from '../../utils/notify'
import env from '../../config/env'

function UserSecurity() {
  const { setUser, setUserReady, isTokenExpired } = useContext(UserContext)
  const [userPassword, setUserPassword] = useState({})
  const [userActivity, setUserActivity] = useState('deactivateMe')
  const [passwordChanging, setPasswordChanging] = useState(false)
  const [activityLoading, setActivityLoading] = useState(false)
  const navigate = useNavigate()

  const handleChangeUserPassword = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmitUserPassword = async (e) => {
    e.preventDefault()

    try {
      setPasswordChanging(true)

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
        setPasswordChanging(false)
        return isTokenExpired()
      }

      if (data.status === 'success') {
        notify('User password updated successfully', 'success')
        setPasswordChanging(false)
      }
    } catch (error) {
      notify(error.message, 'error')
      setPasswordChanging(false)
      console.log(error)
    }
  }

  const handleSubmitUserActivity = async (e) => {
    e.preventDefault()

    try {
      setActivityLoading(true)

      const res = await fetch(`${env.API_ROOT}/api/v1/users/${userActivity}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
        setActivityLoading(false)
        return isTokenExpired()
      }

      if (data.status === 'success') {
        notify(`User account ${userActivity}d successfully`, 'success')
        setUser(null)
        setUserReady(false)
        setActivityLoading(false)
        navigate('/sign-in')
      }
    } catch (error) {
      setActivityLoading(false)
      notify(error.message, 'error')
      console.log(error)
    }
  }

  return (
    <div className='user-view__content'>
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
            {passwordChanging ?
              <button className='btn btn--small btn--green' disabled>Saving...</button>
              :
              <button className='btn btn--small btn--green'>Save password</button>
            }
          </div>
        </form>
      </div>
      <div className='line'>&nbsp;</div>
      <div className='user-view__form-container'>
        <h2 className='heading-secondary ma-bt-md'>DEACTIVATE OR DELETE ACCOUNT</h2>
        <div>
          <div className='input-radio-container'>
            <input id='deactivate' type='radio' name='activity' value='deactivate' onChange={() => setUserActivity('deactivateMe')} />
            <label htmlFor='deactivate'>
              <p><strong>Deactivate Account:</strong> Deactivating your account is <strong>temporary</strong>. Your account will be disabled and will not be visible to other users. Your data will not be deleted. You can reactiavte your acount simply by login.</p>
            </label>
          </div>
          <div className='input-radio-container'>
            <input id='delete' type='radio' name='activity' value='delete' onChange={() => setUserActivity('deleteMe')} />
            <label htmlFor='delete'>
              <p><strong>Delete Account:</strong> Deleting your account is <strong>permanent</strong>. All your data (bookings, reviews and <strong style={{ color: 'red' }}>YOUR PAID WILL NOT REFUND</strong>) will be removed and you will not be able to retrieve your account anymore.</p>
            </label>
          </div>
        </div>
        <div className='form__group right'>
          {
            activityLoading ?
              <button className='btn btn--small btn--red' disabled>Processing...</button>
              :
              <button className='btn btn--small btn--red' onClick={handleSubmitUserActivity}>
                {userActivity == 'deactivateMe' ? 'Deactivate account' : 'Delete account'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

export default UserSecurity