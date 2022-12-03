import { Box, Button, Group, Modal, Text, Textarea, TextInput  } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import { DatePicker } from '@mantine/dates';
import { useRef } from 'react';
import AddProdModal from '../utils/AddProdModal';

function CreateAuction() {

    const [opened , setOpened] = useState(false)

    const [Name , setName] = useState('')
    const [Host , setHost] = useState('')
    const [Desc , setDesc] = useState('')
    const SRef = useRef()
    const ERef = useRef()
    return (
        <Box p='md' m={0} style={{backgroundColor : '#04293a' , color : '#ecb365' , height : '100vh'}}>
            <Group m='md' style={{marginLeft : '20%', border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                    Auction Name :</Text>
                <TextInput value={Name} onChange={(event) => setName(event.currentTarget.value)} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                    Auction Host :</Text>
                <TextInput value={Host} onChange={(event) => setHost(event.currentTarget.value)} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{marginLeft : '20%', border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                   Start Date :</Text>
                <DatePicker placeholder='Pick Start Date' ref={SRef} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg' m='sm' style={{display : 'inline-block'}}>
                    End Date :</Text>
                <DatePicker placeholder='Pick End Date' ref={ERef} style={{display : 'inline-block'}}/>
            </Group>

            <Group m='md' style={{width:'60%', marginLeft : '20%', border : '1px solid red' , padding : '10px' , display : 'inline-block' , borderRadius : '20px' }}>
                <Text color='#ecb365' size='lg'style={{display : 'inline-block'}}>
                    Description :</Text>
                <Textarea value={Desc} onChange={(event) => setDesc(event.currentTarget.value)} autosize style={{ minWidth : '80%'}}/>
            </Group>
            
            <Box style={{display : 'block' , textAlign : 'center'}} p='md'>
                <Button onClick={()=>setOpened(true)} style={{backgroundColor : '#08393a'}}><Text color = '#ecb365'>Add New Product</Text></Button>
            </Box>

            <Modal  
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Product Details!"
            >
                <AddProdModal/>
            </Modal>
            
        </Box>
      )
}

export default CreateAuction

