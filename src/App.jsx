import React from 'react'
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Coin from './pages/Coin/Coin';
import Footer from './Footer/Footer';
import SignUp from './pages/Sign-up/SignUp';
import SignIn from './pages/Sign-in/SignIn'; 
import Blog from './pages/Blog/Blog';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Blog" element={<Blog />} />      
        <Route path="/PasswordRecovery" element={<PasswordRecovery/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App;


