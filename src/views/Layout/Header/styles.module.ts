import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  header: {
    padding: '36px 32px',
    backgroundColor: '#191919',
    minHeight: '5vh',
    background: 'linear-gradient(90deg, rgba(0,0,0,0) 60%, rgba(219,165,23,0.542454481792717) 160%)',
    borderBottom: '1px solid #4D4D4D',
  },
  link: {
    color: '#CACACA',
    fontSize: '16px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
    fontSize: '18px',
    position: 'relative',
    '& svg': {
      marginRight: '8px',
    },
  },
  mobileButton: {
    width: '51px',
    height: '63px',
    '& svg': {
      marginRight: '0',
    },
  },
  linMenu: {
    textDecoration: 'none',
    color: '#DAA10E',
  },
}));

export default useStyles;
