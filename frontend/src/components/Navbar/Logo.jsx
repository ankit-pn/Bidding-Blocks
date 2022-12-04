import { Box, Image, Text } from '@mantine/core'
import React from 'react'

import Logo1 from '../../images/Logo10.png'
import Logo2 from '../../images/Logo11.png'
import Logo3 from '../../images/Logo12.png'

function Logo() {
  return (
        <Box m={0} p={0}>
        <Image m={0} p={0} src={Logo2} width={70} height={70} fit='contain'/>
        </Box>
  )
}

export default Logo