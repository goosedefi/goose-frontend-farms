import {
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footer: {
        width: '100vw',
        backgroundColor: '#1E1F20',
        padding: '49px 33px',
        boxSizing: 'border-box',

    },
    title: {
        color: '#9F9F9F'
    },

    link: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    mobileIcon: {
        marginBottom: '10px',
    },
    centerLink: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '5px',
    },
}));

export default useStyles;