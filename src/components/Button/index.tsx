// @ts-ignore
import React, { FC } from 'react'
import classNames from 'classnames';
import { Button as MaterialButton } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles  from './styles.module';

type Props = MuiButtonProps & {
  className?: string
  outLine?: boolean
  loader?: boolean
  disabled?: boolean
}

const Button: FC<Props> = ({ children, className, outLine,
       loader, disabled, ...props
}) => {
  const classes = useStyles();

  return (
    <MaterialButton
      className={classNames(className, { [classes.button]: outLine, [classes.disable]: disabled })}
      disabled={loader || disabled}
      {...props}
    >
      {loader ? <CircularProgress /> : children}
    </MaterialButton>
  );
};

export default Button;
