import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import React, { useCallback, useState } from 'react'
import classnames from "classnames";

const HeaderContainer = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 16px;
    text-transform: uppercase;
    color: #fff;
  }
  .logoContainer {
    margin-right: 30px;
  }
  .nav_container {
    ul {
      list-style: none;
      li {
        float: left;
        margin: 0px 10px;

        .header_link {
            color: #fff;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 18px;
            text-transform: uppercase;
            font-style: normal;
        }

        .header_link.active {
            color: #30BAC6;
            font-style: bold;
            font-weight: 800;
        }
      }
    }
  }
  .bottomHeader {
    padding: 8px 0px;
    background: red;
  }
`
const BottomHeader = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 9px;
  font-style: italic;
  background: rgb(241, 104, 243);
  background: linear-gradient(137deg, rgba(241, 104, 243, 1) 0%, rgba(159, 229, 255, 1) 100%);
`
const ConnectButton = styled.button`
  padding: 12px 22px;
  border: none;
  border: 1px solid #30bac6;
  border-radius: 4px;
  background: #0a2027;
  font-size: 12px;
  color: #fff;
  display: flex;
`
const EggContainer = styled.div`
  display: flex;
  padding: 0px 10px;
  border: 1px solid #d00dd3;
  flex-direction: row;
  margin-right: 5px;
  border-radius: 4px;
  align-items: center;
  .count {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    margin-left: 10px;
  }
`
export interface HeaderProps {
  lpLabel?: string
}

function Mainheader(props: HeaderProps) {
  const [activePage, setActivePage] = useState('farms')

  const location = useLocation();

  return (
    <div>
      <HeaderContainer>
        <div style={{ display: 'flex' }}>
          <div className="logoContainer">
            <h1>EUPHORIA</h1>
          </div>
          <div className="nav_container">
            <ul>
              <li>
                <Link
                  to="/Trade"
                  className={classnames("header_link", { active: location.pathname === '/Trade' })}
                >
                  Trade
                </Link>
              </li>
              <li>
                <Link to="/Farms" className={classnames("header_link", { active: location.pathname === '/Farms' })}>
                  Farms
                </Link>
              </li>
              <li>
                <Link to="/Pools" className={classnames("header_link", { active: location.pathname === '/Pools' })}>
                  Pools
                </Link>
              </li>
              <li>
                <Link to="/More" className={classnames("header_link", { active: location.pathname === '/More' })}>
                  More
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <EggContainer>
            <div className="egg">
              <img src="/images/farms/egg_logo.png" alt="egg logo" />
            </div>
            <div className="count">$0.126</div>
          </EggContainer>
          <ConnectButton>Connect Wallet</ConnectButton>
        </div>
      </HeaderContainer>
      <BottomHeader>Launching Soon.</BottomHeader>
    </div>
  )
}

export default Mainheader
