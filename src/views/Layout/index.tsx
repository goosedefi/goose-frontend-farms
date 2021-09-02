import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';
import Footer from './Footer';

import useStyles  from './styles.module';

const Layout:FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.container}
    >
      <Grid item xs={12} className={classes.header}>
       <Header/>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12} className={classes.footer}>
       <Footer/>
      </Grid>
    </Grid>
  );
};

export default Layout;
