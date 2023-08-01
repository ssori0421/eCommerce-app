import React from 'react';

const OrderDetails = ({ params }) => {
  const { id } = params;

  return <div>{id}</div>;
};

export default OrderDetails;
