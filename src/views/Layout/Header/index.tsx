import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Grid, AppBar, Toolbar, Button as MuButton, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Image , useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '../../../components/Button';

import LogOutModal from '../../modal/LogOutModal';

import { LogIn, Wallet, ArrowDownIcon } from '../../../constants/icon.constants';
import { PATH_INDEX, LINK_PATH_HOME, LINK_PATH_ABOUT, LINK_PATH_FUNDS, LINK_PATH_ARBX } from '../../../constants/routes.constants';

import useStyles  from './styles.module';


const Header = () => {
  const classes = useStyles();
  const [isLogOutModal, setLogOutModal] = useState(false);
  const [isDropDown, setDropDown] = useState<any>(null);
  const matches = useMediaQuery('(max-width:960px)');
  const { connect, reset, account } = useWallet();
  const { onPresentConnectModal } = useWalletModal(connect, reset);


  const walletAddress = useMemo(() => (
    account && `${account?.slice(0, 7) }...${account?.slice(account?.length - 4, account?.length)}`
  ), [account]);


  return (
    <AppBar position="relative" color="transparent" elevation={1}>
      <Toolbar className={classes.header}>
        <Grid
          container
          alignItems="center"
        >
          <Grid lg={1} md={2} xs={6} item>
            <Link to={PATH_INDEX}>
              <Image src="BiSharesLogo.png" width={114} height={48} alt='logo'/>
            </Link>
          </Grid>
          {
            !matches && (
              <Grid lg={2} md={3} justifyContent="space-around" container item>
                <MuButton className={classes.link} href={LINK_PATH_HOME}>Home</MuButton>
                <MuButton className={classes.link} href={LINK_PATH_ABOUT}>About</MuButton>
                <MuButton className={classes.link} href={LINK_PATH_FUNDS} target='_blank'>Funds</MuButton>
                <MuButton className={classes.link} href={LINK_PATH_ARBX} target='_blank'>ArbEx</MuButton>
              </Grid>
            )
          }
          <Grid lg={9} md={7} xs={4} justifyContent="flex-end" container item>
            {
              account
                ? (
                  <Button
                    className={classNames(classes.button, { [classes.mobileButton]: matches })}
                    onClick={() => setLogOutModal(true)}
                    outLine
                  >
                    {Wallet}{matches ? '' : walletAddress}
                  </Button>)
                : (
                  <Button
                    className={classNames(classes.button, { [classes.mobileButton]: matches })}
                    onClick={onPresentConnectModal}
                    outLine
                  >
                    {LogIn}{matches ? '' : "Connect Wallet"}
                  </Button>)
            }
          </Grid>
          {
            matches && (
              <Grid xs={2} item>
                <Button
                  className={classes.mobileButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={event => setDropDown(event.target)}
                  type='button'
                >
                  {ArrowDownIcon}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={isDropDown}
                  keepMounted
                  open={!!isDropDown}
                  onClose={() => setDropDown(null)}
                >
                  <a href={LINK_PATH_HOME} className={classes.linMenu}><MenuItem>Home</MenuItem></a>
                  <a href={LINK_PATH_ABOUT} className={classes.linMenu}><MenuItem>About</MenuItem></a>
                  <a href={PATH_INDEX} className={classes.linMenu}><MenuItem>Funds</MenuItem></a>
                  <a href={LINK_PATH_ARBX} className={classes.linMenu}><MenuItem>ArbEx</MenuItem></a>
                </Menu>
              </Grid>
            )
          }
        </Grid>
        {isLogOutModal && <LogOutModal onClose={() => setLogOutModal(false)} title={walletAddress} account={account} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
