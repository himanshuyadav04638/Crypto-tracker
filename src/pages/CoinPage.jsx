import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCryptoDetail } from "../utils/services";
import CoinInfo from "../components/CoinInfo";
import Loader from "../components/Loader";
import Coindetail from "../components/Coindetail";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const data = await getCryptoDetail(id);
    setCoin(data.res);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <Loader />;
  return (
    <div className="container mt-4">
      <div className="row">
        <Coindetail coin={coin} />
        <div className="col-md-8 col-12">
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
