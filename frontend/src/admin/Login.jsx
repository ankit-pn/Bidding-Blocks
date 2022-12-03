import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { Box, Button, Center, Modal, PasswordInput, Text, TextInput, UnstyledButton} from '@mantine/core'
import "./Login.css"

function Login() {
    
    const [uid , setuid] = useState(null)
    const [opened , setOpened] = useState(false)

    const handleLogin = async()=>{
        console.log(valueE , valueP)
        const resp = await axios.post('https://auth-backend-2-pp94az2rw-ankit-pn.vercel.app/login/admin' , {
          userId : valueE,
          password : valueP
        })
        console.log(resp['data']['userId'] )
        await localStorage.setItem('user' ,resp['data']['userId'])
        setuid(localStorage.getItem('uid'))
        setLog(1)
        await setOpened(false)
        setValueE('')
        setValueP('')
    }

    const handleRegister = async()=>{
        console.log(valueE , valueN , valueP)
        const resp = await axios.post('https://auth-backend-2-pp94az2rw-ankit-pn.vercel.app/register/admin' , {
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
        <Box className='form' style={{"alignSelf":"center"}}>
          {log ? <>
                <TextInput label='Email' required value={valueE} onChange={(event) => setValueE(event.currentTarget.value)}/>
                <PasswordInput label='Password' required value={valueP} onChange={(event) => setValueP(event.currentTarget.value)}/>
                <Center><Text size='sm' color='black'>Don't have account ? <UnstyledButton style={{fontSize : '0.8rem' , color:'red'}} onClick={()=>{setValueE('');
    setValueN('');
    setValueP('');setLog(false)}}>Register</UnstyledButton></Text></Center>
                <Center><Button m='md' onClick={()=>handleLogin()}><Text style={{color:'white'}}>Login</Text></Button></Center>
              </>
          :<>
            <TextInput label='Name' required value={valueN} onChange={(event) => setValueN(event.currentTarget.value)} />
            <TextInput label='Email' required value={valueE} onChange={(event) => setValueE(event.currentTarget.value)}/>
            <PasswordInput label='Password' required value={valueP} onChange={(event) => setValueP(event.currentTarget.value)}/>
            <Center><Text size='sm' color='black'>Already have an account ? <UnstyledButton style={{fontSize : '0.8rem' , color:'red'}} onClick={()=>{setValueE('')
    setValueN('');
    setValueP('');setLog(true)}}>Login</UnstyledButton></Text></Center>

            <Center><Button m='md' onClick={()=>handleRegister()}><Text style={{color:'white'}}>Register</Text></Button></Center>
          </>
          }
        </Box>
    )
}

export default Login