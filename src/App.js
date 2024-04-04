import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admindash/Dashboard';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import UpdateProduct from './pages/admindash/page/UpdateProduct';
import AddProduct from './pages/admindash/page/AddProduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Odr from './pages/od/odr';


function App() {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      <Route path='/order' element={
        <ProtectedRoutes>
          <Order/>
        </ProtectedRoutes>
      }>
      </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoutesForAdmin>
            <Dashboard/>
          </ProtectedRoutesForAdmin>
        }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/productinfo' element={<ProductInfo/>}/>
        <Route path='/addproduct' element={
          <ProtectedRoutesForAdmin>
            <AddProduct/>
          </ProtectedRoutesForAdmin>
        }/>
        <Route path='/updateproduct' element={
          <ProtectedRoutesForAdmin>
            <UpdateProduct/>
          </ProtectedRoutesForAdmin>
        }/>
        <Route path='/*' element={<Nopage/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
  );
}

export default App;


export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'kd@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}