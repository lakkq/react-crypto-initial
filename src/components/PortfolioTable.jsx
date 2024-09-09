import React, { useContext } from 'react';
import { Table } from 'antd';
import CryptoContext from '../context/crypto-context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    sorter: (a, b) => a.id.length - b.id.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function PortfolioTable() {
    const {cryptoAssets} = useContext(CryptoContext);

    return (
        <Table
        pagination={false}
        style={{padding: '0 20px 20px'}}
        columns={columns}
        dataSource={cryptoAssets}
        onChange={onChange}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    )
}