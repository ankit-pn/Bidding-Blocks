import { Box, Button, Group, Modal, NumberInput, Text, TextInput } from '@mantine/core'
import React from 'react'
import { useState } from 'react'

function ProductCard(props) {
    const [opened ,setOpened] = useState(false)
    const [uid , setuid] = useState(!localStorage.getItem('user') ? true : false)

    const handleBid = ()=>{
        console.log('Handle BId')
        setOpened(false)
    }
    console.log(uid)


  return (
    <Box style={{backgroundColor : '#00867c', justifyItems  : 'flex-end' , borderRadius : '10px' , margin : '0px 10px'}}>

            <Box style={{display : 'flex' , flexDirection :'row' , justifyContent : 'space-between'}}>
            <h2 style={{display : 'inline-block' , margin : '10px 20px', color:'white'}}>{props.name}</h2>
            <Group style={{margin : '10px 20px 2px 20px'}}>
                <Text size='lg' style={{color:'white'}}>₹ {props.price} </Text>
                <Button style={{backgroundColor:'#b64d57'}} onClick={()=>setOpened(true)} disabled={uid}><Text style={{color:'white'}}>Bid</Text></Button>
            </Group>
            </Box>  

        <Text mx='md' style={{color:'white'}}>{props.desc}</Text>


        <Modal  
        opened={opened}
        onClose={() => setOpened(false)}
        title="Make Your Bid!!"
      >
        <Box>
            <NumberInput label="Your Bid" required defaultValue={Number(props.price)}/>
            <div style={{textAlign : 'center' , color:'white'}}>
                <Button m='md' ><Text color='white' onClick={()=>{handleBid()}}>Submit</Text></Button>
            </div>
        </Box>
      </Modal>
    </Box>
  )
}

export default ProductCard