export type DataResponse = {
  name: string
  description: string
  image: string
  rarity: string

  // TODO: Fill in the error type
  error: any
}

/**
 * Get NFT data for a specific tokenURI
 */
const getNftDetailData = async (tokenURI: string): Promise<DataResponse> => {
  let data = {
    name: '',
    description: '',
    image: '',
    rarity: '',
    error: '',
  }
  try {
    const response = await fetch(tokenURI)
    data = await response.json()
    return data
  } catch (error) {
    return data
  }
}

export default getNftDetailData
