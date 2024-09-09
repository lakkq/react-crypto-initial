import { Divider, Form, InputNumber, Button, DatePicker, Result } from "antd";
import CoinInfo from "./CoinInfo";
import CryptoContext from "../context/crypto-context";
import { useContext, useState } from "react";

export default function DrawerForm({ coin, buyAgain, onCloseDrawer }) {
  const [form] = Form.useForm();
  const {addAsset} = useContext(CryptoContext);

  const [asserted, setAsserted] = useState(false);

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    console.log("Success:", values);
    addAsset(newAsset);
    setAsserted(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not valid number",
    },
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }

  if (asserted) {
    return (
      <Result
        status="success"
        title="New Asset Added!"
        subTitle={`Added ${form.getFieldValue("amount")} of ${
          coin.symbol
        } by ${form.getFieldValue("total")}$`}
        extra={[
          <Button type="primary" key="console" onClick={() => buyAgain()} style={{background: 'rgb(60,60,60)'}}>
            Add More
          </Button>,
          <Button key="buy" onClick={() => onCloseDrawer()} >
            Close
          </Button>,
        ]}
      />
    );
  }

  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CoinInfo coin={coin} />
      <Divider style={{ borderColor: "#bbb" }} />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="inter coin amount"
          onChange={handleAmountChange}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{background: 'rgb(60,60,60)'}}>
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
