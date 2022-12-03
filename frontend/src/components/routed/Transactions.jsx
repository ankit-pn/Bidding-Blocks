import { Box,SimpleGrid,Text } from '@mantine/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import TransactionCard from '../utils/TransactionCard'


function Transactions() {

  const [data,setData] = useState('')
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function fetchData(){
      
      const resp = await axios.post('https://bid-data-smart-contract.samualsaul.repl.co/getWinBidByUserId',{
        userId : 's2'
      })

      setData(resp.data.bidDetails)
      setLoading(false)

      console.log(resp.data.bidDetails)
    }

    fetchData()
  },[])

  if(loading){
    return<p>Loading...</p>
  }


  return (
    <SimpleGrid cols={3}>
      {data.map((ele)=><TransactionCard key={ele['productName']} tid={ele['transactionHash']} productName={ele['productName']} seller={ele['soldBy']} soldPrice={ele['soldAt']} buyer={ele['soldTo']}/>)}

       
    </SimpleGrid>
  )
}

export default Transactions