import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'HOMER-BNB',
    lpAddresses: {
      97: '0xbfb8357f3ccfa105968b1836823f5e144145ada5',
      56: '',
    },
    tokenSymbol: 'HOMER',
    tokenAddresses: {
      97: '0xeaBdE99A1DD264849886ffF11A7fBe5637ed6Fa6',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'HOMER-BUSD',
    lpAddresses: {
      97: '0xd1b59d11316e87c3a0a069e80f590ba35cd8d8d3',
      56: '',
    },
    tokenSymbol: 'HOMER',
    tokenAddresses: {
      97: '0xeaBdE99A1DD264849886ffF11A7fBe5637ed6Fa6',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'BNB-BUSD',
    lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      56: '',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  
]

export default farms
