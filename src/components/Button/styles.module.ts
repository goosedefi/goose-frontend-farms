import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
      height: '50px',
      width: '240px',
      border: '1px solid #DAA10E',
      background: 'rgba(218, 161, 14, 0.15)',
      borderRadius: '100px',
      color: '#DAA10E',
      textTransform: 'none'
    },
    disable: {
      '& span': {
        fontWeight: 'bold',
        color: '#1E1F20',
      }
    }
  }
));

export default useStyles;
