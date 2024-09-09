import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import CryptoContext from "../context/crypto-context";
import { useContext } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { cryptoAssets } = useContext(CryptoContext);

  const data = {
    labels: cryptoAssets.map((asset) => asset.symbol),
    datasets: [
      {
        label: "Total",
        data: cryptoAssets.map((asset) => asset.totalAmount),
        backgroundColor: [
          "#000080",
          "#40E0D0",
          "#228B22",
          "#FFA500",
          "#9932CC",
          "#00688B",
          "#00EE76",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "55%", margin: "0 auto 50px" }}>
      <Pie data={data} />
    </div>
  );
}
