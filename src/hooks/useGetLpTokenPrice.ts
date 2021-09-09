import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

import { useBnbPriceState } from 'hooks/useBnbPrice';

import { WBNB_ADDRESS } from '../constants/global.constants';

const useGetLpTokenPrice = ({ lpTokenContract }) => {
  const [lpTokenPrice, setLpTokenPrice] = useState<any>(null);
  const { binancecoin } = useBnbPriceState();

  useEffect(()=> {
    (async () => {
      const totalSupply = await lpTokenContract.methods.totalSupply().call();
      const token0 = await lpTokenContract.methods.token0().call();
      const {_reserve0, _reserve1} = await lpTokenContract.methods.getReserves().call();

      const totalSupplyBN = new BigNumber(totalSupply).div(1e18);
      const reserve = token0 === WBNB_ADDRESS ? new BigNumber(_reserve0).div(1e18) : new BigNumber(_reserve1).div(1e18);
      const result = reserve.multipliedBy(binancecoin?.usd).multipliedBy(2).div(totalSupplyBN);
      setLpTokenPrice(result)
    })()
  },[ lpTokenContract, binancecoin]);

  return { lpTokenPriceUsd: lpTokenPrice };
}

export default useGetLpTokenPrice;