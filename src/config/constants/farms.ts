import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BISON-BUSD LP',
    lpAddresses: {
      97: '0xE2115e605a81dc6CB448f5111DE6bEf5B8a760DA',
      56: '0x5eE167b75118125e7d46add5cE61F749BB977A00',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BISON-BNB LP',
    lpAddresses: {
      97: '0x197885A5af8ffdC945f2c5677A6E0F3A84C141A2',
      56: '0x45b2eF2ECe32b34D20F6C6caD49043740B05f2A5',
    },
    tokenSymbol: 'BISON',
    tokenAddresses: {
      97: '0xADA2270B0CB5b6254d3d48A6fEE55b72693B746A',
      56: '0x50f4220C82c9325dC99f729C3328FB5c338BEaae',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xa75c80e7Ca70505AAB6062cF15A2cFC71b6138C0',
      56: '0x1B96B92314C44b159149f7E0303511fB2Fc4774f',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
