import React from 'react';

import { BnbPriceContext, useBnbPrice } from 'hooks/useBnbPrice';

const BnbPriceContextProvider = ({ children }) => {
  const price = useBnbPrice();

  return (
    <BnbPriceContext.Provider value={price}>
      {children}
    </BnbPriceContext.Provider>
  );
}

export default BnbPriceContextProvider;
