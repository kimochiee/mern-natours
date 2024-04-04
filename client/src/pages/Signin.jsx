import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signin() {
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

    try {
      setLoading(true)

      const response = await fetch('http://localhost:8000/api/v1/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message)
      }

      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error(error.message)
    }
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">Email address</label>
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="you@example.com"
              required="required"
              onChange={handleChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">Password</label>
            <input
              className="form__input"
              name="password"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            {loading ? (
              <button className="btn btn--green">Loading...</button>
            ) : (
              <button className="btn btn--green">Sign in</button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signin