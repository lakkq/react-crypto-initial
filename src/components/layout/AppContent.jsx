import { Layout, Typography } from "antd";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";
import PortfolioChart from "../PortfolioChart";
import PortfolioTable from "../PortfolioTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  width: "",
  background: "#1a1623",
};

export default function AppContent() {
  const { cryptoData, cryptoAssets } = useContext(CryptoContext);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={3}
        style={{ textAlign: "left", color: "white", margin: 10 }}
      >
        Portfolio: {}
        {cryptoAssets
          .map((asset) => {
            const coin = cryptoData.find((c) => c.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <PortfolioTable />
    </Layout.Content>
  );
}
