import { Box, SimpleGrid, Title } from '@mantine/core'
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
      userId : localStorage.getItem('user').split('@')[0]
    })
    setData(resp.data.auctionDetails)
    console.log(resp.data.auctionDetails , 'resp' )
    setLoading(0)
  }
  getData()

  },[])
  
  if(loading){
    return(<Box m={0} pt={50} style={{backgroundColor : '#C7D6D4' , minHeight : '90vh'}}><h1 style={{color : 'black' ,textAlign : 'center'}}>Loading...</h1></Box>)
  }

  return (
      <Box style={{backgroundColor : '#C7D6D4' , minHeight : '90vh'}}>
        {data && <Title p='md' color='black' style={{fontFamily : 'Bitter' , fontWeight : 600 , textAlign : 'center'}} >Your Auctions </Title>}
        {<SimpleGrid p='lg' cols={3}>
      {data?.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard type={1} key={ele['auctionId']} id={ele['auctionId']} host={ele['auctionHost']} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
      {!data && <Title m='lg' order={1} color='grape' style={{textAlign : 'center'}}>No Auctions hosted by You!</Title>}
      </Box>
  )
}

export default Auctions