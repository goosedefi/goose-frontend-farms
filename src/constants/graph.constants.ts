import { gql } from '@apollo/client';

export const getGraphUniSwapBody = array => (
  gql`query GetPrice {
        tokens(where: {id_in: [${array?.map(item => `"${item?.toLowerCase()}"`)}]}) {
        name,
        derivedETH,
        id,
      }}`
);

export const BISON_PRICE =
  gql`query GetPrice {
        token(id: "0x19a6da6e382b85f827088092a3dbe864d9ccba73") {
        name,
        derivedETH,
        id,
      }}`
