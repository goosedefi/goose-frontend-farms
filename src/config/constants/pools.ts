import { PoolConfig, QuoteToken, PoolCategory } from './types'
import contracts from './contracts'

const pools: PoolConfig[] = [
  {
    sousId: 5,
    poolName: 'BISON',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.BISON,
    earningToken: '0x19A6Da6e382b85F827088092a3DBe864d9cCba73',
    stakingTokenAddress: '0x19A6Da6e382b85F827088092a3DBe864d9cCba73',
    contractAddress: {
      97: '0x65114d5af1a33f89d36a79a56c75a4728e02d492',
      56: '0x3d5e1C77e9C81B72b0b0F88Cd63d2Aab38881b96',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://app.apeswap.finance/swap?inputCurrency=ETH&outputCurrency=0x19A6Da6e382b85F827088092a3DBe864d9cCba73',
    harvest: true,
    tokenPerBlock: '0.006751543209876540',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 2,
    poolName: 'BISON-BNB APE',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.BISONBNB,
    earningToken: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    stakingTokenAddress: '0xec1214ee197304c17eb9e427e246a4fd37ba718e',
    contractAddress: {
      97: '0xEA93812aA70eC89932aF6EBe6eCe93135712e4Ab',
      56: '0x99AeB03aCEBAF7b0742a67cE0f3C49E82F5f4897',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://app.apeswap.finance/add/ETH/0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    harvest: true,
    tokenPerBlock: '0.014467592592592600',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 3,
    poolName: 'BISON-BNB PCS',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.BISONBNB,
    earningToken: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    stakingTokenAddress: '0xe5da89fc07cbd30bfc92e14bdbe4c6156d309d12',
    contractAddress: {
      97: '0xEA93812aA70eC89932aF6EBe6eCe93135712e4Ab',
      56: '0x26DdcC2DA40c7e0a85b2396B9d46b7a36C5295b2',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://pancakeswap.finance/add/BNB/0x19A6Da6e382b85F827088092a3DBe864d9cCba73',
    harvest: true,
    tokenPerBlock: '0.014467592592592600',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 4,
    poolName: 'biAPE-BNB APE',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.biAPEBNB,
    earningToken: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    stakingTokenAddress: '0x5035a262543f5ca8502e38a5a55b91a1a26b4f9c',
    contractAddress: {
      97: '0xEA93812aA70eC89932aF6EBe6eCe93135712e4Ab',
      56: '0x7aB0BEd80042bCa202dA306F7C58C4c8a0b2fF27',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://app.apeswap.finance/add/ETH/0xf19b6746769132926ee82f47137aeb7a8702c4b9',
    harvest: true,
    tokenPerBlock: '0.014467592592592600',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 6,
    poolName: 'biCHAIN-BNB ARBX',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.biCHAINBNB,
    earningToken: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    stakingTokenAddress: '0xDAff7BEB8cAD0E75CcA3d9F36b8f8C0e1cf37b85',
    contractAddress: {
      97: '0xEA93812aA70eC89932aF6EBe6eCe93135712e4Ab',
      56: '0xc53138f9445e63b18f7d63f860578787a529c6ee',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://arbex.bishares.finance/add/BNB/0x10A520829C1E9631Ef9E60e37eEA3916092cAa99',
    harvest: true,
    tokenPerBlock: '0.017361111111111100',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  },
  {
    sousId: 6,
    poolName: 'biCHAIN-BNB ARBX',
    tokenName: 'BISON',
    stakingTokenName: QuoteToken.biCHAINBNB,
    earningToken: '0x19a6da6e382b85f827088092a3dbe864d9ccba73',
    stakingTokenAddress: '0xDAff7BEB8cAD0E75CcA3d9F36b8f8C0e1cf37b85',
    contractAddress: {
      97: '0xEA93812aA70eC89932aF6EBe6eCe93135712e4Ab',
      56: '0x49324bB0BE8fF4d6C6881ca4806A65C9f947C238',
    },
    poolCategory: PoolCategory.REWARDS,
    projectLink: 'https://arbex.bishares.finance/add/BNB/0x10A520829C1E9631Ef9E60e37eEA3916092cAa99',
    harvest: true,
    tokenPerBlock: '0.007440476190476190',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
    quoteTokenSymbol: QuoteToken.BISON,
    quoteTokenAdresses: contracts.cake,
  }
]

export default pools
