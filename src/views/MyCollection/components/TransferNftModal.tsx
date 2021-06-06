import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Input, Modal, Text } from '@pancakeswap-libs/uikit'
import { NFT } from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { usePancakeRabbits } from 'hooks/useContract'
import InfoRow from './InfoRow'

interface TransferNftModalProps {
  nft: Nft
  tokenIds: number[]
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

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`
// tokenIds is retrieved dynamically from contracts.
const TransferNftModal: React.FC<TransferNftModalProps> = ({ nft, tokenIds, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    address: '',
    tokenId: tokenIds[0],
  })
  const [error, setError] = useState(null)
  const TranslateString = useI18n()
  const { account } = useWallet()
  const nftContract = usePancakeRabbits(NFT)

  const handleConfirm = async () => {
    try {
      const isValidAddress = Web3.utils.isAddress(values.address)

      if (!isValidAddress) {
        setError(TranslateString(999, 'Please enter a valid wallet address'))
      } else {
        await nftContract.methods
          .transferFrom(account, values.address, values.tokenId)
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
            setError('Unable to transfer NFT')
            setIsLoading(false)
          })
      }
    } catch (err) {
      console.error('Unable to transfer NFT:', err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, name } = evt.target
    setValues({ ...values, [name]: inputValue })
  }

  return (
    <Modal title={TranslateString(999, 'Transfer NFT')} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'Transferring')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <Label htmlFor="transferAddress">{TranslateString(999, 'Receiving address')}:</Label>
        <Input
          id="transferAddress"
          name="address"
          type="text"
          placeholder={TranslateString(999, 'Paste address')}
          value={values.address}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
        {/* <Label htmlFor="transferAddress">{TranslateString(999, 'Token ID')}:</Label>
        <Input
          id="tokenId"
          name="tokenId"
          type="number"
          placeholder={TranslateString(999, 'Enter tokenId')}
          value={values.tokenId}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        /> */}
      </ModalContent>
      <Actions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={!account || isLoading || !values.address || !values.tokenId}
        >
          {TranslateString(464, 'Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default TransferNftModal
