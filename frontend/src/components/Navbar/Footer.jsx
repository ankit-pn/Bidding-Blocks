import { Box, Flex, Image, Text } from '@mantine/core'
import React from 'react'


function Footer() {
    return (
        <Box px='sm' style={{
          backgroundColor : '#041c32',
          position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            color : 'white',
            
            
        }}>
            <pre p='md' style={{color : 'rgb(173, 162, 162)'}}> Team Code Geass  |  Version Beta 5.0 | Bidding Blocks</pre> 
        </Box>
      )
}

export default Footer