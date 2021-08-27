import { Farm } from 'state/types'
import fetchPublicFarmData from './fetchPublicFarmData'

const fetchFarm = async (farm: Farm): Promise<Farm> => {
  const farmPublicData = await fetchPublicFarmData(farm)

  return { ...farm, ...farmPublicData }
}

fetchFarm.defailtProps = {
  isTokenOnly : false,
};

export default fetchFarm
