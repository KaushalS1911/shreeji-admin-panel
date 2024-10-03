import './App.css';
import Listing from './Listing';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import Navbar from './global/Navbar';
import FromPrd from './FromPrd';
import OurProducts from './pages/OurProducts';
import Gallery from './pages/Gallery';
import FormGallery from './FormGallery';
import ProductionBlogs from './pages/ProductionBlogs';
import Inquiry from "./components/inquiry/Inquiry";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Listing />} />
        <Route path='/add-blog' element={<Form />} />
        <Route path='/add-blog/:id' element={<Form />} />
        <Route path="/ourProducts" element={<OurProducts />} />
        <Route path='/add-product' element={<FromPrd />} />
        <Route path='/add-product/:id' element={<FromPrd />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path='/add-gallery' element={<FormGallery />} />
        <Route path='/add-gallery/:id' element={<FormGallery />} />
        <Route path='/productionBlogs' element={<ProductionBlogs />} />
        <Route path='/inquiry' element={<Inquiry />} />
      </Routes>
    </>
  );
}

export default App;
