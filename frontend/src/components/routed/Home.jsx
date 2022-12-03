import { useAuth0 } from '@auth0/auth0-react'
import { Box, Text, Title , SimpleGrid } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useState , useEffect} from 'react'
import AuctionDetailCard from '../utils/AuctionDetailCard'



function Home() {

  const [auctions , setAuctions] = useState(null)
  const [load , setLoad] = useState(true)
  useEffect(() => {
    setLoad(1)
    async function getAuc(){
      const resp = await axios.post('https://product-api-six.vercel.app/getAuctions',{
      apiId : 'user'
    })
      console.log(resp.data.approvedAuction)
      setAuctions(resp.data.approvedAuction)
      setLoad(0)
    }
    getAuc()
    
    // await setAuctions(resp.data)
    
  }, [])
  

  if(load){
    return (<div style={{backgroundColor : 'blue'}}><p >Loading...</p></div>)
  }
  return (
    <Box p='md' m={0} style={{backgroundColor : '#04293a' , color : '#ecb365' , height : '200vh'}}>
      <Title order={1} style={{textAlign:'center'}}>Auctions</Title> 
      
      {<SimpleGrid cols={2}>
      {auctions.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard key={ele['auctionId']} id={ele['auctionId']} host={`ele['AuctionHost']`} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
    </Box>
  )
}

export default Home