import { Box } from '@mui/material'
import React from 'react'
import two from '../../assets/images/3.png'
import five from '../../assets/images/5.png'
import ten from '../../assets/images/10.png'
import pachas from '../../assets/images/50.png'
import soo from '../../assets/images/100.png'
import panso from '../../assets/images/500.png'
import hazar from '../../assets/images/1k.png'
import k3 from '../../assets/images/2 (2).png'

import g2 from '../../assets/images/2g.png'
import g5 from '../../assets/images/5g.png'
import g10 from '../../assets/images/10g.png'
import g50 from '../../assets/images/50g.png'
import g100 from '../../assets/images/100g.png'
import g500 from '../../assets/images/500g.png'
import g1k from '../../assets/images/1kg.png'
import g3k from '../../assets/images/3k.png'

import { NavLink } from 'react-router-dom'

const Coin = ({ setAmount, amount, setisSelectedDropBet }) => {
  return (
    <Box className=" !absolute transform rotate-90 "
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '38%',
        left: '-22%',
        width: '80%',
        transform: 'rotate(90deg)',
        // backgroundColor: 'black',
      }}>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(2)
      }}>
        <Box component='img' src={amount === 2 ? g2 : two} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(5)
      }}>
        <Box component='img' src={amount === 5 ? g5 : five} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(10)
      }}>
        <Box component='img' src={amount === 10 ? g10 : ten} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(50)
      }}>
        <Box component='img' src={amount === 50 ? g50 : pachas} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(100)
      }}>
        <Box component='img' src={amount === 100 ? g100 : soo} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(500)
      }}>
        <Box component='img' src={amount === 500 ? g500 : panso} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(1000)
      }}>
        <Box component='img' src={amount === 1000 ? g1k : hazar} width={30} ></Box>
      </NavLink>
      <NavLink onClick={() => {
        setisSelectedDropBet(false);
        setAmount(3000)
      }}>
        <Box component='img' src={amount === 3000 ? g3k : k3} width={30} ></Box>
      </NavLink>
    </Box>
  )
}

export default Coin
