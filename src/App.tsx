import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './component/home/header'

function App() {
  return (
    <>
      <div className="w-full">

        <div className='fixed top-0 left-0 right-0'>
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
