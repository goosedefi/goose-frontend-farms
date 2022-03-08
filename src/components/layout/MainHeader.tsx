import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
    padding:8px 10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    h1{
        font-size:16px;
        text-transform:uppercase;
        color:#fff;
    }
    .logoContainer{
        margin-right:30px;
    }
    .nav_container{
        ul{
            list-style:none;
            li{
                float:left;
                margin:0px 10px;
                a{
                    color:#fff;
                    font-size:13px;
                    font-weight:600;
                    text-transform:uppercase;
                }
            }
        }
    }
    .bottomHeader{
        padding:8px 0px;
        background:red
    }
`
const BottomHeader = styled.div`
    font-size:14px;
    text-align:center;
    padding:9px;
    font-style:italic;
    background: rgb(241,104,243);
    background: linear-gradient(137deg, rgba(241,104,243,1) 0%, rgba(159,229,255,1) 100%);

`
const ConnectButton = styled.button`
    padding:12px 22px;
    border:none;
    border:1px solid #30BAC6;
    border-radius:4px;
    background:#0A2027;
    font-size:12px;
    color:#fff;
    display:flex;
`
const EggContainer = styled.div`
    display:flex;
    padding:0px 10px;
    border:1px solid #D00DD3;
    flex-direction:row;
    margin-right:5px;
    border-radius:4px;
    align-items:center;
    .count{
        font-size:14px;
        font-weight:600;
        color:#fff;
        margin-left:10px;
    }
`
export interface HeaderProps {
    lpLabel?: string
  }


const Mainheader: React.FC<HeaderProps> = ({
    lpLabel,
  }) => {
    return (
        <div>
        <HeaderContainer>
            <div style={{display: 'flex'}}>
                <div className="logoContainer">
                    <h1>EUPHORIA</h1>
                </div>
                <div className="nav_container">
                    <ul>
                        <li><Link to="/Trade" className="header_link">Trade</Link></li>
                        <li><Link to="/Farms" className="header_link">Farms</Link></li>
                        <li><Link to="/Pools" className="header_link">Pools</Link></li>
                        <li><Link to="/More" className="header_link">More</Link></li>
                    </ul>
                </div>
            </div>

            <div style={{display: 'flex'}}>
                <EggContainer>
                    <div className="egg"><img src="/images/farms/egg_logo.png" alt="egg logo" /></div>
                    <div className="count">$0.126</div>
                </EggContainer>
                <ConnectButton>Connect Wallet</ConnectButton>
            </div>
        </HeaderContainer>
        <BottomHeader>
            Launching Soon.
        </BottomHeader>
        </div>
    )
  }

  export default Mainheader
