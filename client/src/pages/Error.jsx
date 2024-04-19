import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <main className='main'>
      <div className='error'>
        <div className='error__title'>
          <h2 className='heading-secondary heading-secondary--error'>Uh oh! Something went wrong! </h2>
          <h2 className='error__emoji'>😢 🤯</h2>
        </div>
        <div className='error__msg'>{error}</div>
      </div>
    </main>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired
}

export default Error