import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <App />
    <ToastContainer
      toastStyle={{ fontSize: "1.4rem" }}
      position="bottom-right"
      autoClose={1500}
      pauseOnHover={false}
    />
  </UserContextProvider>
)
