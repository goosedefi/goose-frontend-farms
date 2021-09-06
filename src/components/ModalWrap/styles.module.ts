import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  modalWrap: {
    background: '#1E1F20',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '32px',
    minWidth: '340px',
    boxSizing: 'border-box',
    border: '1px solid #333333',
  },
  title: {
    padding: '24px',
    borderBottom: '0.5px solid #333333',
    fontSize: '16px',
  /*  fontWeight: '700', */
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    position: 'relative',

    '& svg': {
      marginRight: '15px',
    },
  },

  closeIcon: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    right: '24px',
    top: '50%',
    transform: 'translate(0, -50%)',

    '& svg': {
      marginRight: '0',
    },
  },
}));

export default useStyles;
