import BigNumber from 'bignumber.js'

export { default as formatAddress } from './formatAddress'

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

/** Returns parts of URL like protocol, host, path for formatting URLs as required.
 * @param  {string} fullUrl
 */
export const getUrlPartsInfo = (fullUrl) => {
  const fullUrlArray = fullUrl.split('/')
  const protocol = fullUrlArray[0]
  const host = fullUrlArray[2]
  const path = fullUrlArray.slice(3).join('/')
  return {
    protocol,
    host,
    path,
    fullUrlArray,
  }
}
