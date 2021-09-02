import React from 'react';

import ModalWrap from '../../../components/ModalWrap';

import { ZapIcon, MetaMaskIcon, WalletConnectIcon } from '../../../constants/icon.constants';

import useStyles from './styles.module';

const ConnectWalletModal = ({ onClose }) => {
  const classes = useStyles();

  return (
    <ModalWrap
      title="Connect to a wallet"
      onClose={onClose}
      iconTitle={ZapIcon}
    >
      <div className={classes.content}>
        <button className={classes.wallet} type='button'>
          Metamask
          <div className={classes.walletIcon}>{MetaMaskIcon}</div>
        </button>
        <button className={classes.wallet} type='button'>
          WalletConnect
          <div className={classes.walletIcon}>{WalletConnectIcon}</div>
        </button>
      </div>
    </ModalWrap>
  );
};

export default ConnectWalletModal;