import React, { useState, useContext, useCallback } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import { NftProviderContext } from '../contexts/NftProvider'

const NftList = () => {
  const { myMints, hasClaimed, balanceOf, nftMap, nftTableData } = useContext(NftProviderContext)

  const filteredNft = []

  nfts.forEach(function (nft, key) {
    const { nftId, name, previewImage, originalImage, description } = nft

    const nftIndex = hasClaimed && hasClaimed.indexOf(nftId)

    const MINTS = myMints[nftIndex] || 0

    if (MINTS > 0) {
      filteredNft.push(nft)
    }
  })

  return (
    <NftGrid>
      {orderBy(filteredNft, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
