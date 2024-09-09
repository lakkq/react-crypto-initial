import { Flex, Tag, Typography, Divider } from "antd";
import CoinInfo from "./CoinInfo";

export default function CoinModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol/>
      <Divider style={{ borderColor: "#bbb" }} />
      <Typography.Paragraph
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <span>
          <Typography.Text strong>1 hour: </Typography.Text>
          <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
            {coin.priceChange1h}%
          </Tag>
        </span>
        <span>
          <Typography.Text strong>1 day: </Typography.Text>
          <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
            {coin.priceChange1d}%
          </Tag>
        </span>
        <span>
          <Typography.Text strong>1 week: </Typography.Text>
          <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
            {coin.priceChange1w}%
          </Tag>
        </span>
      </Typography.Paragraph>
      <Divider style={{ borderColor: "#bbb" }} />
      <Typography.Paragraph>
        <Typography.Text strong>Price: {coin.price.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: {coin.priceBtc}</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: {coin.marketCap.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Total Supply: {coin.totalSupply}</Typography.Text>
      </Typography.Paragraph>
    </>
  );
}
