import { Affix, Box, Button, Group, Modal, NumberInput, Text, TextInput } from '@mantine/core'
import { Notification } from '@mantine/core';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { IconX } from '@tabler/icons';
import { Icon } from '@iconify/react';

function ProductCard(props) {

  console.log(props)
    const [opened ,setOpened] = useState(false)
    const [uid , setuid] = useState(!localStorage.getItem('user') ? true : false)
    const [connected , setConnected] = useState(false)
    const [bidValue , setBidValue] = useState(Number(props.price))
    const [msg , setMsg] = useState('')


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
            setMsg('Please install Metamask extension to use this Dapp')
            setTimeout(() => {
              setMsg('')
            }, 4000);
          }
      }
      else{
        setMsg('Disconnected Successfully!!!')
        setConnected(null)

        setTimeout(() => {
          setMsg('')
        }, 3000);
      }
  }

    const handleBid = async()=>{
        console.log('Handle BId' , bidValue)

        for (const x of props.bids){
          if(x[0] == localStorage.getItem('user')){
            setMsg('You can only bid once per product of any particular auction to ensure fair practices')
            setTimeout(() => {
              setMsg('')
              
            }, 5000);
            return;

          }
        }


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
            transactionId : resp,
            bid : bidValue
          })
          setOpened(0)

        }
        else{
          setMsg('Some error occured!')
          setTimeout(() => {
            setMsg('')
          }, 3000);
        }
    }


    console.log(localStorage.getItem('admin'))

  return (
    <Box style={{backgroundColor : '#00867c', justifyItems  : 'flex-end' , borderRadius : '10px' , margin : '10px 10px' , padding : '10px 10px'}}>

            <Box style={{display : 'flex' , flexDirection :'row' , justifyContent : 'space-between'}}>
            <h2 style={{display : 'inline-block' , margin : '10px 15px', color:'black'}}>{props.name}</h2>
            <Group style={{margin : '10px 20px 2px 20px'}}>
                <Text size='lg' style={{color:'white'}}>₹ {props.price} </Text>
                {!localStorage.getItem('admin') && <Button style={{backgroundColor:'#b64d57'}} onClick={()=>setOpened(true)} disabled={uid}><Text style={{color:'white'}}>Bid</Text></Button>}
            </Group>
            </Box>  

        <Text mx='md' style={{color:'white', marginBottom:'20px'}}>{props.desc}</Text>

        {msg.length > 0 && <Affix position={{ bottom: 20, right: 20 }}><Notification icon={<IconX size={18} />} color="red"><Text>{msg}</Text></Notification></Affix>}
        <Modal  
        opened={opened}
        onClose={() => setOpened(false)}
        title="Make Your Bid!!" 
      >
        <Box>
            <NumberInput label="Your Bid" required defaultValue={Number(props.price)} value={bidValue} onChange={setBidValue}/>
            <div style={{textAlign : 'center' , color:'white'}}>
                <Button  ><Text compact color='white' mr='sm' onClick={()=>{handleConnect()}}>{connected ? 'Disconnect' : 'Connect to MetaMask Wallet'} </Text><Icon icon="logos:metamask-icon" inline={true} /></Button>
                <Button m='md' disabled={!connected}><Text color='white' onClick={()=>{handleBid()}}>Pay </Text></Button>
            </div>
        </Box>
      </Modal>
    </Box>
  )
}

export default ProductCard