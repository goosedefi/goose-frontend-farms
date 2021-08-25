import { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client";
import BigNumber from 'bignumber.js'

import { useBnbPriceState } from 'hooks/useBnbPrice';

import { getGraphUniSwapBody } from '../constants/graph.constants';

const useGetLpTokenPrice = ({ lpTokenContract }) => {
  const [tokensArray, setTokensArray] = useState([]);
  const [lpTokenPrice, setLpTokenPrice] = useState<any>(null);
  const { data } = useQuery(getGraphUniSwapBody(tokensArray));
  const { binancecoin } = useBnbPriceState();

  useEffect(() => {
    (async () => {
      const token0 = await lpTokenContract.methods.token0().call();
      const token1 = await lpTokenContract.methods.token1().call();
      setTokensArray([token0, token1]);
    })()
  },[lpTokenContract]);

  useEffect(()=> {
    if(data?.tokens?.length) {
      (async () => {
        const totalSupply = await lpTokenContract.methods.totalSupply().call();
        const {_reserve0, _reserve1} = await lpTokenContract.methods.getReserves().call();

        const totalSupplyBN = new BigNumber(totalSupply).div(1e18);
        const tokenPrice0 = new BigNumber(data.tokens[0]?.derivedETH).times(binancecoin.usd);
        const tokenPrice1 = new BigNumber(data.tokens[1]?.derivedETH).times(binancecoin.usd);
        const reserve0 = new BigNumber(_reserve0).div(1e18);
        const reserve1 = new BigNumber(_reserve1).div(1e18);
        const result = reserve0.multipliedBy(tokenPrice0).plus(reserve1.multipliedBy(tokenPrice1)).div(totalSupplyBN);
        setLpTokenPrice(result)
      })()
    }
  },[data, lpTokenContract, binancecoin]);

  return { lpTokenPriceUsd: lpTokenPrice };
}

export default useGetLpTokenPrice;
