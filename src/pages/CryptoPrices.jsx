import React, { useEffect, useState } from "react";
import { getCryptoPrice } from "../utils/services";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from 'react-hot-toast';
import CryptoTable from "../components/CryptoTable";
import FavoritesDrawer from "../components/Favritise";

const CryptoPrices = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
 
  const handleFavorite = (crypto) => {
    const isFavorite = favorites.some((fav) => fav.id === crypto.id);
    const updatedFavorites = isFavorite ? favorites.filter((fav) => fav.id !== crypto.id) : [...favorites, crypto];
    toast.success(`${crypto.name} ${isFavorite ? "removed from" : "added to"} favorites`);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  const fetchCryptoPrices = async (page) => {
    try {
      let result = await getCryptoPrice(page);
      setCryptos(result.res);
      setLoading(false);
     } catch (error) {
      console.error("Error fetching crypto prices:", error);
      setLoading(false);
     }
  };

  useEffect(() => {
     fetchCryptoPrices(currentPage);
      const interval = setInterval(() => {
      fetchCryptoPrices(currentPage);
      }, 30000); 
     return () => clearInterval(interval); 
   }, [currentPage]);


  if (loading) return <Loader />;
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 text-white">Asset Tracker</h2>       
      <h3 className="text-white"><FavoritesDrawer favorites={favorites}  handleFavorite={handleFavorite} /></h3>
       <CryptoTable
        cryptos={cryptos}
        favorites={favorites}
        handleFavorite={handleFavorite}
        navigate={navigate}
      />
      <Pagination 
        count={10} 
        page={currentPage} 
        onChange={(event, page) => setCurrentPage(page)}
        color="primary"
        style={{ marginTop: "20px"}}   
      />
   </div>
  );
};

export default CryptoPrices;
