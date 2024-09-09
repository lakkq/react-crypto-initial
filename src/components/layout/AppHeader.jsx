import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/crypto-context";
import CoinModal from "../CoinModal";
import DrawerAsset from "../DrawerAsset";

const headerStyle = {
  height: 60,
  paddingInline: 48,
  width: "100%",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  background: "black",
};

export default function AppHeader() {
  const { cryptoData } = useContext(CryptoContext);

  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState("");

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((s) => !s);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value) => {
    setCoin(cryptoData.find((c) => c.id === value));
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      {" "}
      <Select
        style={{ width: 250, background: 'rgb(70,70,70)' }}
        placeholder="press / to open"
        defaultValue={[]}
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
      <Button
        type="primary"
        style={{ background: "rgb(60,60,60)" }}
        onClick={() => setDrawer(true)}
      >
        Add Asset
      </Button>
      <Modal title="" open={modal} onCancel={() => setModal(false)} footer>
        <CoinModal coin={coin} />
      </Modal>
      <Drawer
        title="Basic Drawer"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
        style={{background:  'rgb(220,220,220)'}}
      >
        <DrawerAsset onCloseDrawer={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
