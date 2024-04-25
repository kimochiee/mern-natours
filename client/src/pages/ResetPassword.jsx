import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { notify } from '../utils/notify'
import env from '../config/env'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  let params = new URLSearchParams(location.search);
  let token = params.get('token');
  let email = params.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return notify('Passwords do not match. Please try again.', 'error')
    }

    if (!token || !email) {
      return notify('Invalid reset password link. Please try again.', 'error')
    }

    try {
      setLoading(true)
      const res = await fetch(`${env.API_ROOT}/api/v1/users/resetPassword`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email,
          password: password,
          passwordConfirm: confirmPassword
        })
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
        setLoading(false)
        return
      }

      if (data.status === 'success') {
        notify('Password reset successful. You can now login with your new password', 'success')
        setLoading(false)
        return navigate('/sign-in')
      }
    } catch (error) {
      notify(error.message, 'error')
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Fill the form to reset your password</h2>
        <form className='form form--login' onSubmit={handleSubmit}>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>Password</label>
            <input
              className='form__input'
              name='password'
              type='password'
              placeholder='••••••••'
              required='required'
              minLength='8'
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='passwordConfirm'>Confirm password</label>
            <input
              className='form__input'
              name='passwordConfirm'
              type='password'
              placeholder='••••••••'
              required='required'
              minLength='8'
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
            />
          </div>
          <div className='form__group'>
            {loading ? (
              <button className='btn btn--green' disabled>Loading...</button>
            ) : (
              <button className='btn btn--green'>Confirm</button>
            )}
          </div>
        </form>
      </div >
    </main >
  )
}

export default ResetPassword