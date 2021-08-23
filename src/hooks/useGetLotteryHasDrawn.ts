import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useLotteryV2Contract } from 'hooks/useContract'
import { getLotteryStatus } from 'utils/lotteryUtils'

/**
 * Returns whether or not the current lottery has drawn numbers
 *
 * @return {Boolean}
 */
const useGetLotteryHasDrawn = () => {
  const [lotteryHasDrawn, setLotteryHasDrawn] = useState(true)
  const { account } = useWallet()
  const lotteryContract = useLotteryV2Contract()

  useEffect(() => {
    if (account && lotteryContract) {
      const fetchLotteryStatus = async () => {
        const state = await getLotteryStatus(lotteryContract)
        setLotteryHasDrawn(state)
      }

      fetchLotteryStatus()
    }
  }, [account, lotteryContract])

  return lotteryHasDrawn
}

export default useGetLotteryHasDrawn
