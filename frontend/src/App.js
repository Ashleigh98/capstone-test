import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserDisplay from './components/UserDisplay';
import Login from './components/Login';
import Register from './components/Register';
import AdminDisplay from './components/AdminDisplay';
import AddEvent from './components/AddEvent';
import './custom.css';
import './login-register.css'
import Favourites from './components/Favourites';


function App() {

  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossOrigin="anonymous"/>
        
      <BrowserRouter>
      
      <Routes>
        
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<UserDisplay/>}/>
        <Route exact path='adminDisplay' element={<AdminDisplay/>}/>
        <Route exact path='/favourites' element={<Favourites/>}/>
        <Route exact path='add' element={<AddEvent/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

