import { createContext, useContext, useState, useEffect } from 'react';

const updatedIntervalSec = 30 * 1000;

export const BnbPriceContext = createContext(undefined);
export const useBnbPriceState = () => useContext(BnbPriceContext);

export const useBnbPrice = () => {
  const [prices, setPrices] = useState(0);

  useEffect(() => {
    const updatePrice = () => fetch(
      // eslint-disable-next-line max-len
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,binance-usd,pancakeswap-token,apeswap-finance,tether,usd-coin&vs_currencies=usd',
    )
      .then((res) => res.json())
      .then((res) => {
        // toDo add condition to update state
        setPrices(res);
      });
    updatePrice();
    try {
      setInterval(() => {
        updatePrice();
      }, updatedIntervalSec);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return prices;
}


