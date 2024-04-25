import { useState } from 'react'
import { notify } from '../utils/notify'
import env from '../config/env'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value.trim())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      return notify('Please fill all the fields', 'error')
    }

    try {
      setLoading(true)

      const res = await fetch(`${env.API_ROOT}/api/v1/users/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message, 'error')
        setLoading(false)
        return
      }

      if (data.status === 'success') {
        notify('Please check your email', 'success')
        setLoading(false)
      }
    } catch (error) {
      notify(error.message, 'error')
      console.error(error.message)
      setLoading(false)
    }
  }

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Type your email below</h2>
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
          <div className='form__group'>
            {loading ? (
              <button className='btn btn--green' disabled>Loading...</button>
            ) : (
              <button className='btn btn--green'>Confirm email</button>
            )}
          </div>
        </form>
      </div >
    </main >
  )
}

export default ForgotPassword