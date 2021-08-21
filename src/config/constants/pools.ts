import { PoolConfig, QuoteToken, PoolCategory } from './types'
import contracts from './contracts'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.BISON,
    earningToken: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    stakingTokenAddress: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    contractAddress: {
      97: '0x65114d5af1a33f89d36a79a56c75a4728e02d492',
      56: '0x00',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://bishares.finance/',
    harvest: true,
    tokenPerBlock: '0.000459896',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 2,
    tokenName: 'BISON-BNB',
    stakingTokenName: QuoteToken.BISONBNB,
    earningToken: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    stakingTokenAddress: '0x197885a5af8ffdc945f2c5677a6e0f3a84c141a2',
    contractAddress: {
      97: '0xC382c9f0f585bBb4e7459C2Be2Cd6775a0e53351',
      56: '0x00',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://bishares.finance/',
    harvest: true,
    tokenPerBlock: '0.000459896',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },{
    sousId: 3,
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.BISON,
    earningToken: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    stakingTokenAddress: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    contractAddress: {
      97: '0x65114d5af1a33f89d36a79a56c75a4728e02d492',
      56: '0x00',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://bishares.finance/',
    harvest: true,
    tokenPerBlock: '0.000459896',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 4,
    tokenName: 'BISON-BNB',
    stakingTokenName: QuoteToken.BISONBNB,
    earningToken: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
    stakingTokenAddress: '0x197885a5af8ffdc945f2c5677a6e0f3a84c141a2',
    contractAddress: {
      97: '0xC382c9f0f585bBb4e7459C2Be2Cd6775a0e53351',
      56: '0x00',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://bishares.finance/',
    harvest: true,
    tokenPerBlock: '0.000459896',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  }
]

export default pools
