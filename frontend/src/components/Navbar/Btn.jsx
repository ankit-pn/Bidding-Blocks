import { Text, UnstyledButton } from '@mantine/core'
import React from 'react'
import './Btn.css'
import { NavLink } from 'react-router-dom'


function Btn(props) {
  return (
    <UnstyledButton mx='md' >
        <NavLink to={props.to}

        className={({ isActive }) => isActive ? 'active' : 'inactive' }
        >
         {props.text}
          </NavLink>
    </UnstyledButton>
  )
}

export default Btn