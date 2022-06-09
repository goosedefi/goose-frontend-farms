import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import React, { useCallback, useState } from 'react'
import classnames from "classnames";

const HeaderContainer = styled.div`
  padding: 8px 10%;
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

  .header_box {
    padding: 30px 5px 30px 5px;
    border-top: 5px solid rgba(255, 255, 255, 0);
  }

  .header_box.active {
    border-top: 5px solid #30BAC6;
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
  font-family: 'IBM Plex Mono Italic', monospace;
  font-size: 18px;
  text-align: center;
  padding: 18px;
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
          <div className="logoContainer header_box">
            <h1>
              <Link to="/">
                EUPHORIA
              </Link>
            </h1>
          </div>
          <div className="nav_container">
            <ul>
              <li>
                <div className={classnames("header_box", { active: location.pathname === '/Trade' })}>
                    <Link
                    to={{ pathname: "https://www.sushi.com/" }}
                    target="_blank"
                    className={classnames("header_link", { active: location.pathname === '/Trade' })}
                    >
                    Trade
                    </Link>
                </div>
              </li>
              <li>
                <div className={classnames("header_box", { active: location.pathname.includes('/Farms') })}>
                    <Link to="/Farms" className={classnames("header_link", { active: location.pathname.includes('/Farms') })}>
                    Farms
                    </Link>
                </div>
              </li>
              <li>
                <div className={classnames("header_box", { active: location.pathname.includes('/Pools') })}>
                <Link to="/Pools" className={classnames("header_link", { active: location.pathname.includes('/Pools') })}>
                  Pools
                </Link>
                </div>
              </li>
              <li>
                <div className={classnames("header_box", { active: location.pathname === '/More' })}>
                <Link to="/More" className={classnames("header_link", { active: location.pathname === '/More' })}>
                  More
                </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <EggContainer>
            <div className="egg">
              <img src="/images/tokens/BLISS.png" alt="bliss logo" width="22px" height="22px" />
            </div>
            <div className="count">$0.126</div>
          </EggContainer>
          <ConnectButton>Connect Wallet</ConnectButton>
        </div>
      </HeaderContainer>
      <BottomHeader>Launching soon...</BottomHeader>
    </div>
  )
}

export default Mainheader
