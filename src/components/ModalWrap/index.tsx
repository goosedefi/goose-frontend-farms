import React from 'react';
import Modal from '@material-ui/core/Modal';

import { CloseIcon } from '../../constants/icon.constants';

import useStyles from './styles.module';

const ModalWrap = ({
   children, iconTitle, title, onClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      open
      onClose={onClose}
      disableAutoFocus
      disableEnforceFocus
    >
      <div className={classes.modalWrap}>
        <div className={classes.title}>
          {iconTitle}{title}
          {onClose && <button className={classes.closeIcon} onClick={onClose} type='button'>{CloseIcon}</button>}
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrap;
