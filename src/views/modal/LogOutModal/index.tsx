import React from 'react';
import Button from '@material-ui/core/Button';

import ModalWrap from '../../../components/ModalWrap';

import { Wallet } from '../../../constants/icon.constants';
import { BSC_SCAN_URL } from '../../../constants/global.constants';

import useStyles from './styles.module';

const LogOutModal = ({ title, onClose, account }) => {
  const classes = useStyles();

  return (
    <ModalWrap
      iconTitle={Wallet}
      title={title}
      onClose={onClose}
    >
      <div className={classes.wrap}>
        <Button className={classes.button} href={`${BSC_SCAN_URL}${account}`} target="_blank">View on BSCScan</Button>
      {/*  <Button className={classes.button} onClick={() => connect(0)}>Log Out</Button> */}
      </div>
    </ModalWrap>
  );
};

export default LogOutModal;
