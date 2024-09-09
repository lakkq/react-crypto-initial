import React, { useContext, useState } from "react";
import { Select, Space } from "antd";
import CryptoContext from "../context/crypto-context";
import DrawerForm from "./DrawerForm";

export default function DrawerAsset({ onCloseDrawer }) {
  const { cryptoData } = useContext(CryptoContext);

  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);

  const handleSelect = (value) => {
    setCoin(cryptoData.find((c) => c.id === value));
  };

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Select coin"
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((s) => !s)}
        options={cryptoData.map((coin) => ({
          label: coin.name,
          value: coin.id,
          img: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.data.img}
              alt={option.data.label}
              style={{ width: "30px" }}
            />
            <span style={{ display: "inline-block", margin: "0" }}>
              {option.data.label}
            </span>
          </Space>
        )}
      />
    );
  }

  return <DrawerForm coin={coin} buyAgain={() => setCoin(false)} onCloseDrawer={onCloseDrawer}/>;
}
