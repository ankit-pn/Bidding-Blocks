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

      var winner = []
      var dd = new Date()
      dd.toISOString().slice(0,10)
      for(const y of resp.data.approvedAuction){
        if(!y['isProcessed'] && y['endDate'] > dd){
          for(const pid of y['productIds']){
              const resp = await axios.post('https://product-api-six.vercel.app/getWinner',{
                productId : pid
              })

              console.log(y , 'y')
              
              const params = {
                productId : pid,
                auctionId : y['auctionId'],
                productName : resp.data['productName'],
                soldBy : `${y['auctionHost'] ?  y['auctionHost'] : 'Anonymous'}`,
                soldTo : resp.data['winnerName'],
                soldAt : resp.data['winnerBid'],
                user : pid+y['auctionId']
              }

              console.log(params)
              await axios.post('https://bid-data-smart-contract.samualsaul.repl.co/postBidDetails',params)

              // winner.push(resp.data)
          }
          await axios.post('https://product-api-six.vercel.app/changeProcessedStatus',{
            auctionId : y['auctionId']
          })
        }
      }
    }
    getAuc()
  
    
  }, [])
  

  if(load){
    return(<Box m={0} pt={50} style={{backgroundColor : '#C7D6D4' , minHeight : '90vh'}}><h1 style={{color : 'black' ,textAlign : 'center'}}>Loading...</h1></Box>)
  }
  return (
    <Box p='md' m={0} style={{backgroundColor : '#C7D6D4' , color : '#ecb365' , minHeight : '90vh'}}>
      <Title order={1} style={{textAlign:'center', color:'black'}}>Auctions</Title> 
      
      {<SimpleGrid  cols={3}>
      {auctions.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard type={1} key={ele['auctionId']} id={ele['auctionId']} host={ele['auctionHost']} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
    </Box>
  )
}

export default Home