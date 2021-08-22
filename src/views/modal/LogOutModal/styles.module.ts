import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrap: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginBottom: '10px',
    width: '100%',
    fontSize: '16px',
    textTransform: 'none',
    color: '#FFFFFF'
  },
}));

export default useStyles;
