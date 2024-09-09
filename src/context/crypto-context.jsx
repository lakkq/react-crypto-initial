import { createContext } from "react";
import { useEffect, useState } from "react";
import { fakeFetchData, fakeFetchAssets } from "../api";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

function relDiff(a, b) {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptoData, setData] = useState([]);
  const [cryptoAssets, setAssets] = useState([]);

  function mapAsset(asset, result) {
    const coin = result.find((c) => c.id === asset.id);
    console.log(`${asset.id}-${cryptoAssets.length}`)
    return {
      cardId: `${asset.id}-${cryptoAssets.length}`,
      name: capitalizeFirstLetter(asset.id),
      key: coin.id,
      symbol: coin.symbol,
      grow: asset.price < coin.price,
      growPresent: relDiff(coin.price, asset.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      ...asset,
    };
  }

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { result } = await fakeFetchData();
      const assets = await fakeFetchAssets();

      setData(result);
      setAssets(assets.map((asset) => mapAsset(asset, result)));
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined spin />} size="large" fullscreen />
    );
  }

  function addAsset(newAsset) {
    setAssets((prev) => [...prev, newAsset].map((asset) => mapAsset(asset, cryptoData)));
    console.log(cryptoAssets);
  }

  function deleteAsset(assetId) {
    setAssets((prev) => prev.filter(asset => asset.id !== assetId))
  }
  
  return (
    <CryptoContext.Provider
      value={{ loading, cryptoData, cryptoAssets, addAsset, deleteAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
