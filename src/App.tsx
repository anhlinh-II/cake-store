import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './component/home/header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="w-full">
        <ToastContainer />
        <div className='fixed z-50 top-0 left-0 right-0'>
          <Header />
        </div>
        <div className='mt-14'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
