import { Box, Group, Image, Text, Title } from '@mantine/core'
import React from 'react'

import Logo1 from '../../images/Logo10.png'
import Logo2 from '../../images/Logo11.png'
import Logo3 from '../../images/Logo12.png'

function Logo() {
  return (
        <Group m={0} p={0}>
        <Image style={{display: 'inline-block'}} m={0} p={0} src={Logo2} width={70} height={70} fit='contain'/>
        <Title order={2}  p={0} color='black' style={{display: 'inline-block' , fontFamily : 'Bitter'}}>Bidding Blocks</Title>
        </Group>
  )
}

export default Logo