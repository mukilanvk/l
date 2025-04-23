import react from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Shop from './Pages/Shop';
import About from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Cart from './Pages/Cart';

function App() {
    return(
        <Router>
            <Navbar/>
            <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
        
    )
}

export default App
