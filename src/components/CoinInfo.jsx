import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartDays } from "../utils/data";
import { getHistoricalChart } from "../utils/services";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import Loader from "./Loader";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchHistoricData = async () => {
    setInitialLoading(true);
    const result = await getHistoricalChart(coin.id, days);
    setHistoricData(result.res.prices);
    setInitialLoading(false);
    setDataFetched(true);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  return (
    <div className="container my-4">
      {(initialLoading || !historicData) && !dataFetched ? (
        <Loader />
      ) : (
        <>
          <div className="chart-container mb-4">
            <Line
              data={{
                labels: historicData.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in USD`,
                    borderColor: "#EEBC1D",
                    backgroundColor: "rgba(238, 188, 29, 0.2)",
                    borderWidth: 2,
                    pointRadius: 3,
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: (tooltipItem) => {
                        return `Price: $${tooltipItem.raw.toFixed(2)}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    ticks: {
                      callback: (value) => `$${value.toFixed(2)}`,
                    },
                    grid: {
                      color: "rgba(200, 200, 200, 0.2)",
                    },
                  },
                },
              }}
            />
          </div>

          <div className="d-flex justify-content-around">
            {chartDays.map((day) => (
              <button
                key={day.value}
                className={`btn btn-outline-warning ${
                  day.value === days ? "active" : ""
                }`}
                onClick={() => setDays(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
