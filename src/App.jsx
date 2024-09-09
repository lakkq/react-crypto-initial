import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import AppContent from "./components/layout/AppContent";
import { CryptoContextProvider } from "./context/crypto-context";

const App = () => {
  return (
    <CryptoContextProvider>
      <Layout style={{ background: "white" }}>
        <AppHeader />
        <Layout >
          <AppSider style={{ background: "white" }}/>
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  );
};

export default App;
