import { Statistic, Card, List, Typography, Tag, Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import CryptoContext from "../context/crypto-context";

export default function AssetCard({ asset }) {
  const { deleteAsset } = useContext(CryptoContext);

  const [hovered, setHovered] = useState(false);

  return (
    <Card style={{ margin: "0 0 10px 0", position: "relative" }} key={asset.id} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
      <Statistic
        title={asset.name}
        value={asset.totalAmount}
        precision={2}
        valueStyle={{
          color: asset.grow ? "#3f8600" : "#cf1322",
        }}
        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix="$"
      />
      <List
        bordered
        dataSource={[
          {
            title: "Total Profit",
            value: asset.totalProfit,
            withTag: true,
          },
          {
            title: "Asset Amount",
            value: asset.amount,
            isPlain: true,
          },
        ]}
        renderItem={(item) => (
          <List.Item
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 10px",
            }}
          >
            <span>{item.title}</span>
            <span>
              {item.withTag && (
                <Tag color={asset.grow ? "green" : "red"}>
                  <span>{asset.growPresent.toFixed(1)}%</span>
                </Tag>
              )}
              {item.isPlain && <span>{item.value}</span>}
              {!item.isPlain && (
                <Typography.Text type={asset.grow ? "success" : "danger"}>
                  {item.value.toFixed(2)}$
                </Typography.Text>
              )}
            </span>
          </List.Item>
        )}
      />
      <Button
        danger
        style={{ position: "absolute", top: 10, right: 10, opacity: hovered ? '100%' : '0'}}
        onClick={() => deleteAsset(asset.id)}
      >
        Delete
      </Button>
    </Card>
  );
}
