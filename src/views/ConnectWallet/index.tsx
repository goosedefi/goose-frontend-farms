import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import Button from '../../components/Button';

import { ZapOffIcon, LogIn, AlertTriangle } from '../../constants/icon.constants';
import { CHAIN_ID } from '../../constants/global.constants';

import useStyles  from './styles.module';

const ConnectWallet = () => {
  const classes = useStyles();
  const { chainId, account } = useWeb3React();
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)


  return (
    <div className={classes.wrap}>
      {
        (!!account && chainId !== CHAIN_ID)
          ? (
            <>
              <div>{AlertTriangle}</div>
              <div className={classes.text}>WRONG NETWORK DETECTED</div>
              <div className={classes.description}>Please connect to the Binance Smart Chain Network</div>
            </>
          )
          : (
            <>
              <div>{ZapOffIcon}</div>
              <div className={classes.text}>Connect a Wallet to ACCESS the DASHBOARD</div>
              <Button className={classes.button} onClick={onPresentConnectModal} outLine>{LogIn}Connect Wallet</Button>
            </>
          )
      }
    </div>
  );
};

export default ConnectWallet;
