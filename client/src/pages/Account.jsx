import { useSelector } from "react-redux"
import NavItem from "../components/user/NavItem"

function Account() {
  const { currentNatoursUser } = useSelector((state) => state.user)

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="/dashboard" text="My Profile" icon="settings" active={true} />
            <NavItem link="/my-tours" text="My Tours" icon="briefcase" active={false} />
            <NavItem link="/bookings" text="Bookings" icon="credit-card" active={false} />
            <NavItem link="/reviews" text="My Reviews" icon="star" active={false} />
          </ul>
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <NavItem link="/manage-tours" text="Manage Tours" icon="map" active={false} />
              <NavItem link="/manage-users" text="Manage Users" icon="users" active={false} />
              <NavItem link="/manage-reviews" text="Manage Reviews" icon="star" active={false} />
              <NavItem link="/manage-bookings" text="Manage Bookings" icon="calendar" active={false} />
            </ul>
          </div>
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label htmlFor="name" className="form__label">Name</label>
                <input type="text" id="name" name="name" className="form__input" value={currentNatoursUser.name} required />
              </div>
              <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input type="email" id="email" name="email" className="form__input" value={currentNatoursUser.email} required />
              </div>
              <div className="form__group form__photo-upload">
                <img src={`img/users/${currentNatoursUser.photo}`} alt="User photo" className="form__user-photo" />
                <input type="file" id="photo" name="photo" className="form__upload" accept="image/*" />
                <label htmlFor="photo">choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">Save settings</button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label htmlFor="currentPassowrd" className="form__label">Current password</label>
                <input type="password" id="currentPassowrd" name="currentPassowrd" className="form__input" placeholder="********" minLength={8} required />
              </div>
              <div className="form__group">
                <label htmlFor="password" className="form__label">New password</label>
                <input type="password" id="password" name="password" className="form__input" placeholder="********" minLength={8} required />
              </div>
              <div className="form__group .ma-bt-lg">
                <label htmlFor="passwordConfirm" className="form__label">Confirm password</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" className="form__input" placeholder="********" minLength={8} required />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">Save password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Account