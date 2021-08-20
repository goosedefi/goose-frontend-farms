import React, { useState, useCallback, Fragment } from 'react'

// import {ImageBackground} from 'react-native'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

//   background-image: url('https://icons.iconarchive.com/icons/designcontest/ecommerce-business/256/bar-chart-icon.png');
const StyledFarmStakingCard = styled(Card)`
  background: radial-gradient(ellipse at center, rgb(202, 202, 202) 10%, rgb(248, 239, 225) 100%);
  background-repeat: no-repeat;
  background-position: center;
  min-height: 16px;
`


const Block = styled.div`
  margin-bottom: 16px;
  width: 200px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const ChartImageArea = styled.div`
  background: url('https://icons.iconarchive.com/icons/designcontest/ecommerce-business/256/bar-chart-icon.png');
  background-position: right;
  justify-content: center;
  background-repeat: no-repeat;
`
// ${({ theme }) => theme.colors.textSubtle};
const Label = styled.div`
  color: black;
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

const headerCol = 'rgba(0, 32, 96, 1)';

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px" color={headerCol}>
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <ChartImageArea>
        <CardImage src="https://quantresurgencemhy2069p5074.s3.eu-west-2.amazonaws.com/logos/QR_reduced.png" alt="QR logo" width={64} height={64}/>
        <Block>
          <Label>QT to Harvest</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Label >~${(eggPrice * earningsSum).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label> QT in Wallet</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label >~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </Block>
      </ChartImageArea>

        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
              color="rgba(142, 0, 0, 1)"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting QR')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
