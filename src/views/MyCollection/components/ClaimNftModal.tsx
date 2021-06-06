import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { NftFarm, AMOUNT_TO_CLAIM } from 'config/constants/nfts'
import { getLifeAddress } from 'utils/addressHelpers'
import { Nft } from 'config/constants/types'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useERC20, useRabbitMintingFarm } from 'hooks/useContract'
import InfoRow from './InfoRow'
import { useNftAllowance } from '../../../hooks/useAllowance'
import { useNftApprove } from '../../../hooks/useApprove'

interface ClaimNftModalProps {
  nft: Nft
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const nftMintingContract = useRabbitMintingFarm(NftFarm)
  const contraToken = useERC20(getLifeAddress())
  const allowance = useNftAllowance(contraToken, NftFarm, pendingTx)
  const onApprove = useNftApprove(contraToken, NftFarm)
  const cakeBalance = useTokenBalance(getLifeAddress())
  const cakeInWallet = getBalanceNumber(cakeBalance)

  // console.log('getLifeAddress', getLifeAddress(), NftFarm, allowance)
  // console.log('allowance', allowance)

  const handleConfirm = async () => {
    if (allowance === null) {
      return
    }

    try {
      await nftMintingContract.methods
        .mintNFT(nft.nftId)
        .send({ from: account })
        .on('sending', () => {
          setIsLoading(true)
        })
        .on('receipt', () => {
          onDismiss()
          onSuccess()
        })
        .on('error', () => {
          console.error(error)
          setError('Unable to claim NFT')
          setIsLoading(false)
        })
    } catch (err) {
      console.error('Unable to mint NFT:', err)
    }
  }

  useEffect(() => {
    if (cakeInWallet === 0) {
      setError(`You must have LIFE balance to claim NFT`)
    }
  }, [cakeInWallet, setError])

  return (
    <Modal title={`Claim NFT for ${nft.tokenAmount} LIFE`} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'You will receive')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
      </ModalContent>
      <Actions>
        <Button
          fullWidth
          disabled={!account || pendingTx || isLoading || allowance > 0}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onApprove()
              setPendingTx(false)
            } catch (e) {
              setPendingTx(false)
              console.error(e)
            }
          }}
        >
          Approve
        </Button>

        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={!account || isLoading || cakeInWallet <= 0 || allowance <= 0}
        >
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
