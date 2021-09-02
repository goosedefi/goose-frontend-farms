import { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client";
import BigNumber from 'bignumber.js'

import { useBnbPriceState } from 'hooks/useBnbPrice';

import { getGraphUniSwapBody } from '../constants/graph.constants';

const useGetLpTokenPrice = ({ lpTokenContract }) => {
  const [tokensArray, setTokensArray] = useState([]);
  const [lpTokenPrice, setLpTokenPrice] = useState<any>(null);
  const { data } = useQuery(getGraphUniSwapBody(["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"]));
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
        const reserve1 = new BigNumber(_reserve1).div(1e18);
        const result = reserve1.multipliedBy(tokenPrice0).plus(reserve1.multipliedBy(tokenPrice0)).div(totalSupplyBN);
        setLpTokenPrice(result)
      })()
    }
  },[data, lpTokenContract, binancecoin]);

  return { lpTokenPriceUsd: lpTokenPrice };
}

export default useGetLpTokenPrice;
