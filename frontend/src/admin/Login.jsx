import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { Box, Button, Center, Modal, Paper, PasswordInput, Text, TextInput, UnstyledButton} from '@mantine/core'
import "./Login.css"
import { useNavigate } from 'react-router-dom';

function Login() {
    const nav = useNavigate()
    const [uid , setuid] = useState(null)
    const [opened , setOpened] = useState(false)

    const handleLogin = async()=>{
        console.log(valueE , valueP)
        const resp = await axios.post('https://auth-backend-2.vercel.app/login/admin' , {
          adminId : valueE,
          password : valueP
        })
        console.log(resp['data']['adminId'] , 'resp' )
        await localStorage.setItem('admin' ,resp['data']['adminId'])
        setuid(localStorage.getItem('admin'))
        setLog(1)
        await setOpened(false)
        setValueE('')
        setValueP('')
        nav('/admin/pending')
        
    }

    const handleRegister = async()=>{
        console.log(valueE , valueN , valueP)
        const resp = await axios.post('https://auth-backend-2.vercel.app/register/admin' , {
          adminId : valueE,
          password : valueP,
          adminName : valueN
        })
        setValueE('')
        setValueN('')
        setValueP('') 
        await console.log(resp.data.result)
        setLog(1)
        
      }

      const [valueN, setValueN] = useState('');
      const [valueE, setValueE] = useState('');
    const [valueP, setValueP] = useState('');

    const [log, setLog] = useState(localStorage.getItem('users') ? true : false);
  
    return (
        <Paper className='form' style={{ borderRadius : '0px' , backgroundColor : '#ddd' , margin : '0px 35% 0px 35%' , maxWidth : '30%' }}>
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
        </Paper>
    )
}

export default Login