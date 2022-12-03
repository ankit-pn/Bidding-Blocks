import { Box, Button, Grid, Stack, Text } from '@mantine/core'
import React from 'react'

function TransactionCard(props) {
  return (
    <Box style={{backgroundColor:'#4db6ab', marginBottom : '12px', borderRadius:'10px'}}>
         <Grid justify='space-between'>
            <Box style={{paddingLeft: '30px'}}>
                <h2><Text color="black">{props.productName}</Text></h2>
                <Text color='black'>{props.seller}</Text> 
            </Box>
            <Stack align="flex-end" style={{margin : '20px', padding : '7px'}}>
                <Text style={{color : 'black'}}>{props.soldPrice}</Text>
                <Text style={{color : 'black'}}>{props.buyer}</Text>
            </Stack>
            <Button>Verification Signature</Button>
        </Grid>
    </Box>
  )
}

export default TransactionCard