import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'BUSD-CFT LP',
    lpAddresses: {
      97: '0xa116a70d0a4955c8f749e4ef833d5bee2ce3119a',
      56: '',
    },
    tokenSymbol: 'CFT',
    tokenAddresses: {
      97: '0xDACee0C89E7d6CE4cE384C6de8B595343276CA3c',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'BNB-CFT LP',
    lpAddresses: {
      97: '0xeF7Ff8BBab806063E2C30Ac2C07bD6703B7AF421',
      56: '',
    },
    tokenSymbol: 'CFT',
    tokenAddresses: {
      97: '0xDACee0C89E7d6CE4cE384C6de8B595343276CA3c',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.WBNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      56: '',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.WBNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  

]

export default farms
