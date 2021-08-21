import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BISON LP',
    lpAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isTokenOnly: true,
    factory: 'ape'
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'BISON-BNB LP',
    lpAddresses: {
      97: '0x5BAa840959A291e274FF3C523Cd0eb85659a2360',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    factory: 'pcs'
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BISON-BNB LP',
    lpAddresses: {
      97: '0xd48952C7Ff5346d6753f3547B9606769538845B8',
      56: '0xd1b59d11316e87c3a0a069e80f590ba35cd8d8d3',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    factory: 'ape'
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BISON-BUSD LP',
    lpAddresses: {
      97: '0x1Ab63eDAc9BDfb697E1118BAD44366bb4CeC6c88',
      56: '0x99ffD623a46362d61D5E0F9ABf9728A2A429acf5',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0x279d41f3f78fe5C1f0BA41aE963d6E545113C973',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
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
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'biApe-BNB LP',
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
    factory: 'ape'
  },
  {
    pid: 6,
    risk: 5,
    lpSymbol: 'biT10-BNB LP',
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
    factory: 'ape'
  },
]

export default farms