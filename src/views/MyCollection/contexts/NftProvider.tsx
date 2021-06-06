import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from 'hooks/useBlock'
import nftFarm from 'config/abi/NftFarm.json'
import { NftFarm } from 'config/constants/nfts'
import multicall from 'utils/multicall'
import nfts from 'config/constants/allnfts'
import { getNftContract, getFromWei, getToFloat, getToInt, getFromWayArray } from '../utils/contracts'
import { getUrlPartsInfo } from '../../../utils'
import getNftDetailData from '../../../utils/getNftDetailData'

interface NftProviderProps {
  children: ReactNode
}

type NftMap = {
  [key: number]: number[]
}

type State = {
  isInitialized: boolean
  hasClaimed: number[]
  ownerById: number[]
  amounts: number[]
  maxMintByNft: number[]
  prices: number[]
  myMints: number[]
  nftTableData: any[]
  countBurnt: number
  endBlockNumber: number
  startBlockNumber: number
  totalSupplyDistributed: number
  currentDistributedSupply: number
  balanceOf: number
  nftMap: NftMap

  allowMultipleClaims: boolean
  rarity: string
  priceMultiplier: number
  maxMintPerNft: number
  tokenPerBurn: number
}

type Context = {
  canBurnNft: boolean
  getTokenIds: (nftId: number) => number[]
  reInitialize: () => void
} & State

export const NftProviderContext = createContext<Context | null>(null)

const NftProvider: React.FC<NftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    isInitialized: false,
    hasClaimed: [],
    ownerById: [],
    countBurnt: 0,
    startBlockNumber: 0,
    endBlockNumber: 0,
    totalSupplyDistributed: 0,
    currentDistributedSupply: 0,
    balanceOf: 0,
    nftMap: {},

    allowMultipleClaims: true,
    rarity: '',
    priceMultiplier: 0,
    maxMintPerNft: 0,
    tokenPerBurn: 0,

    amounts: [],
    maxMintByNft: [],
    prices: [],
    myMints: [],
    nftTableData: [],
  })
  const { account } = useWallet()
  const currentBlock = useBlock()

  const { isInitialized } = state

  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const [
          startBlockNumberArr,
          endBlockNumberArr,
          countBurntArr,
          totalSupplyDistributedArr,
          currentDistributedSupplyArr,

          allowMultipleClaimsArr,
          rarityArr,
          priceMultiplierArr,
          maxMintPerNftArr,
          tokenPerBurnArr,
        ] = await multicall(nftFarm, [
          { address: NftFarm, name: 'startBlockNumber' },
          { address: NftFarm, name: 'endBlockNumber' },
          { address: NftFarm, name: 'countBurnt' },
          { address: NftFarm, name: 'totalSupplyDistributed' },
          { address: NftFarm, name: 'currentDistributedSupply' },
          { address: NftFarm, name: 'allowMultipleClaims' },
          { address: NftFarm, name: 'rarity' },
          { address: NftFarm, name: 'priceMultiplier' },
          { address: NftFarm, name: 'maxMintPerNft' },
          { address: NftFarm, name: 'tokenPerBurn' },
        ])

        // TODO: Figure out why these are coming back as arrays
        const [startBlockNumber]: [BigNumber] = startBlockNumberArr
        const [endBlockNumber]: [BigNumber] = endBlockNumberArr
        const [countBurnt]: [BigNumber] = countBurntArr
        const [totalSupplyDistributed]: [BigNumber] = totalSupplyDistributedArr
        const [currentDistributedSupply]: [BigNumber] = currentDistributedSupplyArr

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          countBurnt: countBurnt.toNumber(),
          startBlockNumber: startBlockNumber.toNumber(),
          endBlockNumber: endBlockNumber.toNumber(),
          currentDistributedSupply: currentDistributedSupply.toNumber(),
          totalSupplyDistributed: totalSupplyDistributed.toNumber(),
          allowMultipleClaims: allowMultipleClaimsArr[0],
          rarity: rarityArr[0].toString(),
          priceMultiplier: parseFloat(priceMultiplierArr[0].toString()),
          maxMintPerNft: parseInt(maxMintPerNftArr[0].toString()),
          tokenPerBurn: getFromWei(tokenPerBurnArr[0]),
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    fetchContractData()
  }, [isInitialized, setState])

  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const nftContract = getNftContract()

        const getMinted = await multicall(nftFarm, [{ address: NftFarm, name: 'getMinted', params: [account] }])

        const hasClaimed = getMinted[0][0]
        const amounts = getToFloat(getMinted[0][1])
        const ownerById = getMinted[0][2]
        const maxMintByNft = getToInt(getMinted[0][3])
        const prices = getFromWayArray(getMinted[0][4])
        const myMints = getToInt(getMinted[0][5])

        // console.log('hasClaimed', hasClaimed)
        // console.log('amounts', amounts)
        // console.log('ownerById', ownerById)
        // console.log('maxMintByNft', maxMintByNft)
        // console.log('prices', prices)
        // console.log('myMints', myMints)

        const balanceOf = await nftContract.methods.balanceOf(account).call()

        let nftMap: NftMap = {}

        let nftTableData = []

        // If the "balanceOf" is greater than 0 then retrieve the tokenIds
        // owned by the wallet, then the nftId's associated with the tokenIds
        if (balanceOf > 0) {
          const getTokenIdAndNftId = async (index: number) => {
            try {
              const tokenId = await nftContract.methods.tokenOfOwnerByIndex(account, index).call()
              const nftId = await nftContract.methods.getNftId(tokenId).call()

              return [parseInt(tokenId, 10)]
            } catch (error) {
              return null
            }
          }

          const getNftData = async (index: number) => {
            try {
              const tokenId = await nftContract.methods.tokenOfOwnerByIndex(account, index).call()
              const tokenURI = await nftContract.methods.tokenURI(parseInt(tokenId, 10)).call()
              const { name: nftName, rarity } = await getNftDetailData(tokenURI)
              const { fullUrlArray } = getUrlPartsInfo(tokenURI)
              const hash = fullUrlArray[4]
              const hashId = parseInt(fullUrlArray[5].substring(0, fullUrlArray[5].length - 5), 10)
              let nftDetailLink = ''
              if (rarity === 'Base' || rarity === 'Rare') {
                nftDetailLink = `/detail/${hashId}`
              } else if (rarity === 'Epic') {
                nftDetailLink = `/epic-detail/${hashId}`
              } else if (rarity === 'Legendary') {
                nftDetailLink = `/legendary-detail/${hashId}`
              }

              const nftPreviewImage = nfts.filter((nft) => nftName === nft.name).map((nft) => nft.previewImage)

              return {
                tokenId: parseInt(tokenId, 10),
                type: `${hash} ,  ${hashId}`,
                rarity,
                nftName,
                nftPreviewImage,
                nftDetailLink,
              }
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []
          const nftTablePromises = []

          for (let i = 0; i < balanceOf; i++) {
            nftTablePromises.push(getNftData(i))
            tokenIdPromises.push(getTokenIdAndNftId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)
          nftTableData = await Promise.all(nftTablePromises)

          // While improbable a wallet can own more than one of the same nft so the format is:
          // { [nftId]: [array of tokenIds] }
          nftMap = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [nftId, tokenId] = association

            return {
              ...accum,
              [nftId]: accum[nftId] ? [...accum[nftId], tokenId] : [tokenId],
            }
          }, {})
        }

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          hasClaimed,
          ownerById,
          balanceOf,
          nftMap,

          amounts,
          maxMintByNft,
          prices,
          myMints,
          nftTableData,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  const canBurnNft = currentBlock <= state.endBlockNumber
  const getTokenIds = (nftId: number) => state.nftMap[nftId]

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider value={{ ...state, canBurnNft, getTokenIds, reInitialize }}>
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
