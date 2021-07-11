import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'HOMER-BNB LP',
    lpAddresses: {
      97: '0xbfb8357f3ccfa105968b1836823f5e144145ada5',
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
  
]

export default farms
