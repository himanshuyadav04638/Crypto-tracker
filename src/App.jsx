import "./styles/global.css"
import CryptoPrices from './pages/CryptoPrices';
import CoinPage from "./pages/CoinPage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import  { Toaster } from 'react-hot-toast';


function App() {

  return (
     <>
       <Header />
       <Routes>
         <Route path="/" element={ <CryptoPrices />} />
         <Route path="/coin/:id" element={ <CoinPage />} />
       </Routes>  
       <Toaster   position="top-center"  reverseOrder={false} />
     </>
  )
}

export default App
