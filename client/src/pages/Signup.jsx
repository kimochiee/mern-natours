

function Signup() {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create new account</h2>
        <form className="form form--login">
          <div className="form__group">
            <label className="form__label" htmlFor="email">Your name</label>
            <input
              className="form__input"
              name="name"
              type="text"
              placeholder="John Doe"
              required="required"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">Email address</label>
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="you@example.com"
              required="required"
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
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">Confirm Password</label>
            <input
              className="form__input"
              name="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required="required"
              minLength="8"
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Sign up</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signup