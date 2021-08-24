import React from 'react';
import classNames from 'classnames';
import {
  Grid, AppBar, Toolbar, Typography, Link as MaterialLink,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import {
  TwitterIcon, GitHub, TelegramIcon, MediumSquareIcon, DiscordIcon,
} from '../../../constants/icon.constants';

import useStyles from './styles.module';

const footerLinks = [
  {
    icon: TwitterIcon,
    href: 'https://twitter.com/BiSharesFinance',
  },
  {
    icon: GitHub,
    href: 'https://github.com/bisharesindexfund',
  },
  {
    icon: TelegramIcon,
    href: 'https://t.me/bishares',
  },
  {
    icon: MediumSquareIcon,
    href: 'https://bi-shares.medium.com',
  },
  {
    icon: DiscordIcon,
    href: 'https://discord.com/invite/w2jejq5rBP',
  },
];

const Footer = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:1350px)');

  return (
    <AppBar position="relative" color="transparent" elevation={1}>
      <Toolbar className={classes.footer}>
        <Grid
          container
          alignItems="center"
        >
          <Grid
            item
            lg={2}
            xs={12}
            container
            alignItems="center"
            justifyContent={matches ? 'center' : 'flex-start'}
            spacing={3}
            className={classNames({ [classes.mobileIcon]: matches })}
          >
            {
              footerLinks.map(item => (
                <Grid item key={item.href}>
                  <Typography
                    className={classes.link}
                    component={MaterialLink}
                    style={{ textDecoration: 'none' }}
                    href={item.href}
                    target="_blank"
                    color="textPrimary"
                    variant="h5"
                    noWrap
                  >
                    {item.icon}
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
          <Grid lg={2} xs={12} item container justifyContent="center" alignItems="center">
            <Grid xs={12} lg={6} item className={classNames({ [classes.centerLink]: matches })}>
              <Typography
                component={MaterialLink}
                target="_blank"
                color="textSecondary"
                style={{ textDecoration: 'none', color: '#9F9F9F' }}
                variant="subtitle1"
                href="https://bishares.finance/assets/docs/bishares-gordian-audit.pdf"
              >
                Gordian Audit
              </Typography>
            </Grid>
            <Grid xs={12} lg={6} item className={classNames({ [classes.centerLink]: matches })}>
              <Typography
                component={MaterialLink}
                target="_blank"
                color="textSecondary"
                style={{ textDecoration: 'none', color: '#9F9F9F' }}
                variant="subtitle1"
                href="https://bishares.finance/assets/docs/bishares-defiyield-audit.pdf"
              >
                DefiYield Audit
              </Typography>
            </Grid>
          </Grid>
          <Grid item lg={8} container justifyContent="flex-end" alignItems="center" spacing={3}>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                variant="subtitle1"
                noWrap
              >
                © 2021 by Bishares Finance
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
