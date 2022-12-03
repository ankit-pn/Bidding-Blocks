import { Box, Button, Group, Modal, NumberInput, Text, TextInput } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function ProductCard(props) {

  console.log(props)
    const [opened ,setOpened] = useState(false)
    const [uid , setuid] = useState(!localStorage.getItem('user') ? true : false)
    const [connected , setConnected] = useState(false)
    const [bidValue , setBidValue] = useState(Number(props.price))


    const handleConnect = async () =>{
      if(!connected){  
          const { ethereum } = window;
          if(ethereum && ethereum.isMetaMask){
              try {
                  const res = await ethereum.request({ method: 'eth_requestAccounts' })
                  setConnected(res[0])
              } catch (error) {
                  console.error(error);
              }
          }
          else{
              console.log('NO METAMASK EXTENSION')
          }
      }
      else{
        setConnected(null)
      }
  }

    const handleBid = async()=>{
        console.log('Handle BId' , bidValue)
        if(window.ethereum.selectedAddress){
          const params = [
            {
              from: `${window.ethereum.selectedAddress}`,
              to: `0x588138839c2ea2f767B04bCed5B7334959A60A1c`,
              value : `${1000000000*bidValue}`
            },
          ]
        await window.ethereum.request({"method":"eth_getBalance" , "params":[window.ethereum.selectedAddress, "latest"]}).then((res)=>console.log(Number(res)))
        const resp = await window.ethereum.request({"method":"eth_sendTransaction","params":params})
        
          const res = await axios.post('https://product-api-six.vercel.app/addBider',{
            userId : localStorage.getItem('user'),
            auctionId: props.aid,
            productId : props.pid,
            transactionId : resp

          })
          console.log(res)

        }
        else{
          console.log('Not Installed')
        }
    }


  return (
    <Box style={{backgroundColor : '#00867c', justifyItems  : 'flex-end' , borderRadius : '10px' , margin : '5px 10px'}}>

            <Box style={{display : 'flex' , flexDirection :'row' , justifyContent : 'space-between'}}>
            <h2 style={{display : 'inline-block' , margin : '10px 20px', color:'white'}}>{props.name}</h2>
            <Group style={{margin : '10px 20px 2px 20px'}}>
                <Text size='lg' style={{color:'white'}}>₹ {props.price} </Text>
                <Button style={{backgroundColor:'#b64d57'}} onClick={()=>setOpened(true)} disabled={uid}><Text style={{color:'white'}}>Bid</Text></Button>
            </Group>
            </Box>  

        <Text mx='md' style={{color:'white', margin:''}}>{props.desc}</Text>


        <Modal  
        opened={opened}
        onClose={() => setOpened(false)}
        title="Make Your Bid!!"
      >
        <Box>
            <NumberInput label="Your Bid" required defaultValue={Number(props.price)} value={bidValue} onChange={setBidValue}/>
            <div style={{textAlign : 'center' , color:'white'}}>
                <Button  ><Text color='white' onClick={()=>{handleConnect()}}>{connected ? 'Disconnect' : 'Connect to MetaMask Wallet'} </Text></Button>
                <Button m='md' disabled={!connected}><Text color='white' onClick={()=>{handleBid()}}>Submit & Pay </Text></Button>
            </div>
        </Box>
      </Modal>
    </Box>
  )
}

export default ProductCard