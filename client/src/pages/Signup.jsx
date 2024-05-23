import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notify } from '../utils/notify'
import env from '../config/env'
import { UserContext } from '../context/UserContext'

function Signup() {
  const { setUser, setUserReady, setToken } = useContext(UserContext)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      notify('Please fill all the fields', 'error')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      notify('Passwords do not match', 'error')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${env.API_ROOT}/api/v1/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')

        setLoading(false)

        return
      }

      if (data.status === 'success') {
        notify('Sign up successful', 'success')

        setUser(data.data.user)
        setToken(data.token)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data.data.user))
        setUserReady(true)
        setLoading(false)
        setLoading(false)

        return navigate('/');
      }
    } catch (error) {
      notify(error.message, 'error')
      console.error(error.message)
    }
  }

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Create new account</h2>
        <form className='form form--login' onSubmit={handleSubmit}>
          <div className='form__group'>
            <label className='form__label' htmlFor='email'>Your name</label>
            <input
              className='form__input'
              name='name'
              type='text'
              placeholder='John Doe'
              required='required'
              onChange={handleChange}
            />
          </div>
          <div className='form__group'>
            <label className='form__label' htmlFor='email'>Email address</label>
            <input
              className='form__input'
              name='email'
              type='email'
              placeholder='you@example.com'
              required='required'
              onChange={handleChange}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>Password</label>
            <input
              className='form__input'
              name='password'
              type='password'
              placeholder='••••••••'
              required='required'
              minLength='8'
              onChange={handleChange}
            />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>Confirm Password</label>
            <input
              className='form__input'
              name='passwordConfirm'
              type='password'
              placeholder='••••••••'
              required='required'
              minLength='8'
              onChange={handleChange}
            />
          </div>
          <div className='form__group'>
            {loading ? (
              <button className='btn btn--green' disabled>Loading...</button>
            ) : (
              <button className='btn btn--green'>Sign up</button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signup