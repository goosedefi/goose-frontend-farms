import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  footer: {
    width: '100vw',
    backgroundColor: '#1E1F20',
    padding: '49px 33px',
    boxSizing: 'border-box',
  },
  title: {
    color: '#9F9F9F',
  },

  link: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  mobileIcon: {
    '@media (max-width: 1280px)': {
      marginBottom: '10px',
    },
  },
  copyrightTitle: {
    display: 'flex',
    justifyContent: 'flex-end',
    '@media (max-width: 1280px)': {
      justifyContent: 'center',
    },
  },
  centerLink: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '5px',
  },
}))

export default useStyles
