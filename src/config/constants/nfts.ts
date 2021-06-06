import { Nft } from './types'

export const RABBIT_MINTING_FARM_ADDRESS = '0x7c8b60d2b859a38c8B9b5B6CB4565485cb637c7a'
export const PANCAKE_RABBITS_ADDRESS = '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07'
export const NftFarm = '0x08d2cBc5EFd1B56034F4628bB32e947C0d86BbB1'
export const NFT = '0x3F7C7C24fFA2ceFfaACE11B39D5b8a575A4B0674'
export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Main Pass NFT',
    metadata: '',
    description: 'All inclusive Main Event Venue DJ Concert. Open Bar. Lottery draw for the afterparty exclusive. Transportation to and from all events from approved hotels.',
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/swapsies.png',
    previewImage: 'preview1.png',
    blurImage: 'swapsies-blur.png',
    sortOrder: 999,
    bunnyId: 0,
    fileType: 'mp4',
    nftId: 0,
    tokenAmount: 25,
    tokenSupply: 500,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  },
  {
    name: 'Yacht Pass NFT',
    metadata: '',
    description: "All inclusive Yacht Party. Fully Catered. Open Bar. Private DJ. Full day Punta Cana booze cruise sightseeing tour. Main Event NFT’s included! (25 STOS Value). Transportation to and from all events",
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/drizzle.png',
    previewImage: 'preview2.png',
    blurImage: 'drizzle-blur.png',
    sortOrder: 999,
    bunnyId: 1,
    fileType: 'mp4',
    nftId: 1,
    tokenAmount: 250,
    tokenSupply: 50,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  },
  {
    name: 'VIP WEEK Pass NFT',
    metadata: '',
    description: "5 Bed Villa from a list of oceanfront choices. Personal chef with daily menus. Transportation to and from the events. Yacht Party Admission. Main Event Admission + Afterparty. Party of 8 covered for Villa and all admissions. 4 days, 3 nights (extensions extra)",
    originalImage: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/blueberries.png',
    previewImage: 'preview3.png',
    blurImage: 'blueberries-blur.png',
    sortOrder: 999,
    bunnyId: 2,
    fileType: 'mp4',
    nftId: 3,
    tokenAmount: 20000,
    tokenSupply: 3,
    nftFarmContract: '0x3627Ca89675b42489aD39619A92dd0Ce24CA90bB',
    nftContract: '0xa521D5FA64D0aAdB4ee607BAb20142aA173e4392',
  }
]

export default Nfts
