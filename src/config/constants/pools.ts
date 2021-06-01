import { PoolConfig, QuoteToken, PoolCategory } from './types'
import contracts from './contracts'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'STOS',
    stakingTokenName: QuoteToken.STOS,
    earningToken: '0x9eab0a93b0cd5d904493694f041bdcedb97b88c6',
    stakingTokenAddress: '0x9eab0a93b0cd5d904493694f041bdcedb97b88c6',
    contractAddress: {
      97: '0x52B0b88b172E0b21f0558605496Ab46bb1Ce0557',
      56: '0x0a886563c8741A4d08599bB91ee31d67e79567E8',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://stos.finance/',
    harvest: true,
    tokenPerBlock: '0.000459896',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.STOS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 3,
    tokenName: 'STOS',
    stakingTokenName: QuoteToken.STOSBNB,
    earningToken: '0x9eab0a93b0cd5d904493694f041bdcedb97b88c6',
    stakingTokenAddress: '0xe0E3F3698ba35487e5285fDfd31a5B8d8F564D8b',
    contractAddress: {
      97: '0x52B0b88b172E0b21f0558605496Ab46bb1Ce0557',
      56: '0x4c55A4D6b9B0F27B45a6c88c2f6D306511FA28a0',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://stos.finance/',
    harvest: true,
    tokenPerBlock: '0.000689845',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.STOSBNB,
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
