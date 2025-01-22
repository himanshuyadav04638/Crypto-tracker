import React from "react";
import ReactHtmlParser from "react-html-parser";

const Coindetail = ({ coin }) => {
  return (
    <div className="col-md-4 col-12 text-center border-end">
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        className="mb-3 img-fluid"
      />
      <h3 className="fw-bold mb-3 text-white">{coin?.name}</h3>
      <p className="text-justify px-3 text-white">
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
      </p>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold text-white">Rank:</h5>
          <h5 className="text-white">{coin?.market_cap_rank}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold text-white">Current Price:</h5>
          <h5 className="text-white">${coin?.market_data.current_price.usd}</h5>
        </div>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold text-white">Market Cap:</h5>
          <h5 className="text-white">${coin?.market_data.market_cap.usd}</h5>
        </div>
      </div>
    </div>
  );
};

export default Coindetail;
