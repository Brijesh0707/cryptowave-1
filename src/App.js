import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Single from './pages/Single';
import {Routes,Route} from "react-router-dom";




const App = () => {
  return (
    <>
  
   <Navbar></Navbar>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/singlecoin/:id' element={<Single/>}/>

      
        
      </Routes>
    <Footer></Footer>


    </>
  )
}

export default App