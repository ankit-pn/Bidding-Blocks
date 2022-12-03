import { Button, Center, NumberInput, Text, Textarea, TextInput } from '@mantine/core'
import React from 'react'
import { useState } from 'react';

function AddProdModal() {

    const [valueN, setValueN] = useState('');
  const [valueD, setValueD] = useState('');
  const [valueP, setValueP] = useState('');


  return (
    <div>
        <TextInput label='Product Name' required value={valueN} onChange={(event) => setValueN(event.currentTarget.value)} />
        <NumberInput label='Base Price' required value={valueP} autosize onChange={(event) => setValueP(event.currentTarget.value)}/>

        <Textarea label='Description' required value={valueD} autosize onChange={(event) => setValueD(event.currentTarget.value)}/>
        <Center>
            <Button m='md' ><Text color='white'>Submit</Text></Button>
        </Center>
    </div>
  )
}

export default AddProdModal