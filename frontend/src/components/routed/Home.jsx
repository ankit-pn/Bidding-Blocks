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
      console.log(resp.data.approvedAuction , 'neww')
      setAuctions(resp.data.approvedAuction)
      setLoad(0)

      for(const y of resp.data.approvedAuction){
        if(!y['isProcessed'] && y['endDate'] > new Date().toISOString().slice(0,10)){
          for(const pid of y['productIds']){
            await axios.post('https://bid-data-smart-contract.samualsaul.repl.co/',{
              auctionId : '',         

            })
          }
        }
      }


    }
    getAuc()
    
    // await setAuctions(resp.data)
    
  }, [])
  

  if(load){
    return (<div style={{backgroundColor : '#89B0AC'}}><p >Loading...</p></div>)
  }
  return (
    <Box p='md' m={0} style={{backgroundColor : '#C7D6D4' , color : '#ecb365' , minHeight : '90vh'}}>
      <Title order={1} style={{textAlign:'center', color:'black'}}>Auctions</Title> 
      
      {<SimpleGrid cols={3}>
      {auctions.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard type={1} key={ele['auctionId']} id={ele['auctionId']} host={ele['auctionHost']} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
    </Box>
  )
}

export default Home