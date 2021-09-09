const getAvatar = (poolName) => {
  switch (poolName) {
    case 'biAPE-BNB APE':
      return 'biAPE'
    case 'biCHAIN-BNB ARBX':
      return 'biChain'
    default:
      return 'BISON'
  }
}

export default getAvatar
