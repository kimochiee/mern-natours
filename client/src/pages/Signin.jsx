import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { notify } from '../utils/notify'
import env from '../config/env'

function Signin() {
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

    if (!formData.email || !formData.password) {
      notify('Please fill all the fields', 'error')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${env.API_ROOT}/api/v1/users/signin`, {
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
        notify('Sign in successful', 'success')

        setUser(data.data.user)
        setToken(data.token)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data.data.user))
        setUserReady(true)
        setLoading(false)
        
        return navigate('/');
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
        <h2 className='heading-secondary ma-bt-lg'>Sign into your account</h2>
        <form className='form form--login' onSubmit={handleSubmit}>
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
          <div className='form__group'>
            {loading ? (
              <button className='btn btn--green' disabled>Loading...</button>
            ) : (
              <button className='btn btn--green'>Sign in</button>
            )}
          </div>
          <div className='form__group' style={{
            fontSize: '1.6rem',
            textAlign: 'center'
          }}>
            <span>
              Forgot your password?
              <Link to='/forgot-password' className='btn-secondary'> Click Here!</Link>
            </span>
          </div>
        </form>
      </div >
    </main >
  )
}

export default Signin