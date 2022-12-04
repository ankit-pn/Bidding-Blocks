
import { Box, Button, Center, Flex, Group, Input, Modal, PasswordInput, Text, TextInput, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import Btn from './Btn'
import Logo from './Logo'
import axios from "axios";
import { useNavigate } from 'react-router-dom'



function NavBar() {
  
  const [opened , setOpened] = useState(false)
  const [uid , setuid] = useState(null)

  const nav = useNavigate()

  var data = localStorage.getItem('user') ? [
    {text : 'Home' , to : '/' },
    {text : 'Transactions' , to : '/txn' },
    {text : 'Auctions' , to : '/auctions' },
    {text : 'Host Auction' , to : '/createAuc' },
  ] : [{text : 'Home' , to : '/' },{text : 'Recent Transactions' , to : '/txn'}]

  var st1 = {
    backgroundColor : 'green',
  }

  const handleLogout = ()=>{
    console.log('LOGOUT CALLED')
    localStorage.removeItem('user')
    setuid(null)
    setLog(false)

    nav('/')
  
  }

  const handleLogin = async()=>{
    console.log(valueE , valueN , valueP)
    const resp = await axios.post('https://auth-backend-2.vercel.app/login/user' , {
      userId : valueE,
      password : valueP
    })
    console.log(resp['data']['userId'] )
    await localStorage.setItem('user' ,resp['data']['userId'])
    setuid(localStorage.getItem('uid'))
    setLog(1)
    await setOpened(false)
    setValueE('')
    setValueN('')
    setValueP('')
  }

  const handleRegister = async()=>{
    console.log(valueE , valueN , valueP)
    const resp = await axios.post('https://auth-backend-2.vercel.app/register/user' , {
      userId : valueE,
      password : valueP,
      name : valueN
    })
    setValueE('')
    setValueN('')
    setValueP('')
    await console.log(resp.data.result)
    setLog(true)
  }
  const [valueN, setValueN] = useState('');
  const [valueE, setValueE] = useState('');
  const [valueP, setValueP] = useState('');

  const [log, setLog] = useState(localStorage.getItem('users') ? true : false);



  return (
    <Box style={{
      backgroundColor : '#4db6ab',
      margin : '0' , 
      padding : '5px',
      width : '100%',
      position : 'sticky' , 
      top : 0,
      left : 0,
      zIndex : 100,
      minHeight : '7vh',
      display : `${window.location.pathname.includes('/admin') ? 'none' : 'block'}`
    }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register yourself!"
      >
        <Box>
          {log ? <>
                <TextInput label='Email' required value={valueE} onChange={(event) => setValueE(event.currentTarget.value)}/>
                <PasswordInput label='Password' required value={valueP} onChange={(event) => setValueP(event.currentTarget.value)}/>
                <Center><Text mt='sm' size='sm' color='black'>Don't have account ? <UnstyledButton style={{fontSize : '0.8rem' , color:'red'}} onClick={()=>{setValueE('');
    setValueN('');
    setValueP('');setLog(false)}}>Register</UnstyledButton></Text></Center>
                <Center><Button m='md' onClick={()=>handleLogin()}><Text style={{color:'white'}}>Login</Text></Button></Center>
              </>
          :<>
            <TextInput label='Name' required value={valueN} onChange={(event) => setValueN(event.currentTarget.value)} />
            <TextInput label='Email' required value={valueE} onChange={(event) => setValueE(event.currentTarget.value)}/>
            <PasswordInput label='Password' required value={valueP} onChange={(event) => setValueP(event.currentTarget.value)}/>
            <Center><Text size='sm' mt='sm' color='black'>Already have an account ? <UnstyledButton style={{fontSize : '0.8rem' , color:'red'}} onClick={()=>{setValueE('')
    setValueN('');
    setValueP('');setLog(true)}}>Login</UnstyledButton></Text></Center>

            <Center><Button m='md' onClick={()=>handleRegister()}><Text style={{color:'white'}}>Register</Text></Button></Center>
          </>
          }
        </Box>
      </Modal>

      
      <Flex justify="space-between" >
        <Logo />

        <Group>{data.map((ele)=><Btn text={ele.text} key={ele.to} to={ele.to} />) }</Group>
        {!localStorage.getItem('user') ?  <Button style={{backgroundColor:'#821d2e' , position : 'relative' , top : '18px' , right : '20px'}} onClick={()=>setOpened(true)}><Text style={{color:'white'}}>Login</Text></Button> : <Button style={{backgroundColor:'#821d2e', position : 'relative' , top : '18px' , right : '20px'}} onClick={()=>{handleLogout()}}><Text style={{color:'white'}}>Logout</Text></Button>}
      </Flex>
    </Box>
  )
}

export default NavBar