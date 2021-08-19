import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BISON-BUSD LP',
    lpAddresses: {
      97: '0x8B7635d524d1eD9518F3Dc32980E13584BB175d8',
      56: '0x99ffD623a46362d61D5E0F9ABf9728A2A429acf5',
    },
    tokenSymbol: 'VLAD',
    tokenAddresses: {
      97: '0xa800D23CCc013d2cFF18665cCc4709d45D969841',
      56: '0x279d41f3f78fe5C1f0BA41aE963d6E545113C973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BISON',
    lpAddresses: {
      97: '0xE2115e605a81dc6CB448f5111DE6bEf5B8a760DA',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isTokenOnly: true
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BISON-BNB LP',
    lpAddresses: {
      97: '0x197885A5af8ffdC945f2c5677A6E0F3A84C141A2',
      56: '0xd1b59d11316e87c3a0a069e80f590ba35cd8d8d3',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 4,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms