import { Box, SimpleGrid } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AuctionDetailCard from '../utils/AuctionDetailCard'

function Auctions() {
  
  const [data , setData] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function getData(){
      const resp = await axios.post('https://product-api-six.vercel.app/getAuctionByUserId',{
      userId : 'elonmusk'
    })
    setData(resp.data.auctionDetails)
    console.log(resp.data.auctionDetails , 'resp' )
    setLoading(0)
  }
  getData()

  },[])
  
  if(loading){
    return <p style={{backgroundColor : 'red'}}>Loading...</p>
  }

  return (
      <Box style={{backgroundColor : '#C7D6D4'}}>
        {<SimpleGrid cols={1}>
      {data.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard key={ele['auctionId']} id={ele['auctionId']} host={ele['auctionHost']} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
      </Box>
  )
}

export default Auctions