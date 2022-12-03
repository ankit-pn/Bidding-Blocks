import { Box,Text } from '@mantine/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'


function Transactions() {

  const [data,setData] = useState('')

  useEffect(()=>{
    async function fetchData(){
      
      const resp = await axios.post('https://bid-data-smart-contract.samualsaul.repl.co/getWinBidByUserId',{
        userId : 's2'
      })

      console.log(resp.data.bidDetails)
    }

    fetchData()
  },[])


  return (
    <Box m={0} p={0} >

       
    </Box>
  )
}

export default Transactions