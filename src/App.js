import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/home';
import Login from './screen/login';
import Register from './screen/register';
import Welcome from './screen/welcome';

function App() {   
  return (      
   <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route path='/welcome' element={<Welcome/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  
 </Routes>
 </BrowserRouter>
   
   </>



  );
}

export default App;
