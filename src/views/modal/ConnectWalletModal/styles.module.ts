import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  content: {
    padding: '24px',
  },
  wallet: {
    background: '#191919',
    borderRadius: '16px',
    padding: '10px 16px',
    marginBottom: '8px',
    display: 'flex',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#DAA10E',
    textTransform: 'uppercase',
  /*  fontWeight: '700', */
    position: 'relative',

    '&:hover': {
      backgroundColor: '#000',
    },
  },
  walletIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translate(0, -50%)',
    width: '32px',
    height: '32px',
  },

}));

export default useStyles;
