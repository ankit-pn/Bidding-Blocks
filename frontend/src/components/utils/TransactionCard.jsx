import { Box, Button, Grid, Stack, Text } from '@mantine/core'
import React from 'react'

function TransactionCard(props) {
  return (

    <Box style={{backgroundColor:'#00867c', margin : '10px 10px', borderRadius:'10px'}}>
         <Grid justify='space-between'>
            <Box style={{paddingLeft: '30px'}}>
                <h2><Text color="white">{props.productName}</Text></h2>
                <Text color='black'>{props.seller}</Text> 
            </Box>
            <Stack align="flex-end" style={{margin : '20px', padding : '7px'}}>
                <Text style={{color : 'white'}}>{props.soldPrice}</Text>
                <Text style={{color : 'black'}}>{props.buyer}</Text>
            </Stack>
        </Grid>
        <center><Button style={{backgroundColor:'#b64d57', marginBottom : '10px'}} onClick = {()=> window.open(`https://goerli.etherscan.io/tx/${props.tid}`, '_blank', 'noopener,noreferrer')} ><Text style={{color:'white'}}>Verification Signature</Text></Button></center>
    </Box>
  )
}

export default TransactionCard