import { Layout } from "antd";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
import AssetCard from "../AssetCard";

const siderStyle = {
  padding: "1rem",
  background: "#1a1623",
};

export default function AppSider() {
  const { cryptoAssets } = useContext(CryptoContext);
  console.log(cryptoAssets);
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {cryptoAssets.map((asset) => {
        return <AssetCard asset={asset} key={asset.id} />;
      })}
    </Layout.Sider>
  );
}
