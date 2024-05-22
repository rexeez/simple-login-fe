import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} /> */}
       </Routes>
    </>
 );
};

export default App