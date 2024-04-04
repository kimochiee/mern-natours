import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
      <ToastContainer
        toastStyle={{ fontSize: "1.4rem" }}
        position="bottom-left"
        autoClose={1500}
        pauseOnHover={false}
      />
    </Provider>
  </PersistGate>
)
