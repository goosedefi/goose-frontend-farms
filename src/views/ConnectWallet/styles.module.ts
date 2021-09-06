import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    wrap: {
      background: '#1E1F20',
      border: '1px solid #4D4D4D',
      borderRadius: '32px',
      padding: '40px 65px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    text: {
      textTransform: 'uppercase',
      margin: '20px 0 32px',
      maxWidth: '230px',
      textAlign: 'center',
      lineHeight: '25px',
      color: '#FFF',
    },

    description: {
      color: '#9F9F9F',
      margin: ' -10px 0 32px',
    },

    button: {
      '& svg': {
        marginRight: '12px',
      },
    },
  }
));

export default useStyles;
