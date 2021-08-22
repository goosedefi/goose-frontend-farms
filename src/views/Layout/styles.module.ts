import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#191919',
  },
  header: {
    zIndex: 0,
  },
  footer: {
    zIndex: 0,
  },
}));

export default useStyles;