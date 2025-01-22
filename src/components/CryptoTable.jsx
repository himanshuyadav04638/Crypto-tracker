import React from "react";
import HeartColor from "../assets/HeartColor";
import HeartWithoutColour from "../assets/HeartWithoutColour";

const CryptoTable = ({ cryptos, favorites, handleFavorite, navigate }) => {
  const renderFavoriteButton = (crypto) => {
    const isFavorite = favorites.some((fav) => fav.id === crypto.id);
    return (
      <button
        className={`favorite-button ${isFavorite ? "remove" : "add"}`}
        onClick={() => handleFavorite(crypto)}
      >
        {isFavorite ? <HeartColor /> : <HeartWithoutColour />}
      </button>
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price (USD)</th>
          <th>24h Change</th>
          <th>Market Cap</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto) => {
          const profit = crypto.price_change_percentage_24h > 0;
          return (
            <tr key={crypto.id}>
              <td onClick={() => navigate(`/coin/${crypto.id}`)}>
                {crypto.market_cap_rank}
              </td>
              <td onClick={() => navigate(`/coin/${crypto.id}`)}>
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  width="25"
                  height="25"
                  className="me-2"
                />
                {crypto.name}
              </td>
              <td onClick={() => navigate(`/coin/${crypto.id}`)}>
                ${crypto.current_price.toLocaleString()}
              </td>
              <td
                style={{
                  color: profit ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                }}
                onClick={() => navigate(`/coin/${crypto.id}`)}
              >
                {profit && "+"}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${crypto.market_cap.toLocaleString()}</td>
              <td>{renderFavoriteButton(crypto)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CryptoTable;
