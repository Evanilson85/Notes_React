import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './context/auth'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
  //  <AuthProvider>  passando todas informaçoes do usuario
   <AuthProvider>
      <BrowserRouter>
          <ToastContainer autoClose={3000}/>
          <Routes/>
      </BrowserRouter>
   </AuthProvider> 
  )
}

export default App;
