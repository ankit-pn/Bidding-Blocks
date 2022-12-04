import { Box,SimpleGrid,Text, Title } from '@mantine/core'
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

    async function fetchDataforAll(){
      
      const resp = await axios.post('https://bid-data-smart-contract.samualsaul.repl.co/getAllWinBid',{
        aid : 'all'
      })

      setData(resp.data.bidDetails)
      setLoading(false)

      console.log(resp.data.bidDetails)
    }


    if(localStorage.getItem('user')){
      fetchData()
    }
    else{
      fetchDataforAll()
    }
  },[])

  if(loading){
    return<p>Loading...</p>
  }


  return (
    <Box>
      {localStorage.getItem('user') ? <Title m='md' style={{textAlign : 'center'}} order={1} color='#035E6C'>Your Purchased Products will Appear here</Title>: <Title m='md' style={{textAlign : 'center' , fontFamily : 'Bitter'}} order={1} color='#035E6C'>Viewing All Recent Transactions on Bidding Blocks</Title>}

    <SimpleGrid m='lg' cols={3}>
      {data?.map((ele)=><TransactionCard key={ele['productName']} tid={ele['transactionHash']} productName={ele['productName']} seller={ele['soldBy']} soldPrice={ele['soldAt']} buyer={ele['soldTo']}/>)}
       
    </SimpleGrid>
    {!data && <Title style={{textAlign : 'center'}} order={1} color='grape'>No Products Purchased</Title>}
    </Box>
  )
}

export default Transactions