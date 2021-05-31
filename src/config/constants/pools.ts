import { PoolConfig, QuoteToken, PoolCategory } from './types'
import contracts from './contracts'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'STOS',
    stakingTokenName: QuoteToken.STOS,
    earningToken: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    stakingTokenAddress: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    contractAddress: {
      97: '0x52B0b88b172E0b21f0558605496Ab46bb1Ce0557',
      56: '0x00',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://stos.finance/',
    harvest: true,
    tokenPerBlock: '0.0147',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.STOS,
    quoteTokenAdresses: contracts.cake,
  },
  // {
  //   sousId: 1,
  //   tokenName: 'TWT',
  //   stakingTokenName: QuoteToken.SYRUP,
  //   stakingTokenAddress: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
  //   contractAddress: {
  //     97: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af5633061A',
  //     56: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af5633061A',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://trustwallet.com/',
  //   harvest: true,
  //   tokenPerBlock: '20',
  //   sortOrder: 999,
  //   isFinished: true,
  //   tokenDecimals: 18,
  // },
]

export default pools
