import { Box, SimpleGrid } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AuctionDetailCard from '../components/utils/AuctionDetailCard'

function AdminPending() {
    
    const [data , setData] = useState()
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        async function getData(){
           const resp =  await axios.post('https://product-api-six.vercel.app/getAuctions',{
                apiId : 'admin'
            })

            console.log(resp.data.allauction)
            setData(resp.data.allauction)
            setLoading(false)
        }
        getData()
        
    },[])

    if(loading){
        return <p>Loading....</p>
    }
  
    return (
        <Box>
            {<SimpleGrid cols={2}>
      {data.map((ele)=>{console.log(ele , 'ELE')
      return <AuctionDetailCard type={2} key={ele['auctionId']} id={ele['auctionId']} host={ele['auctionHost']} status={ele['Status']} name={ele['auctionName']} desc={ele['auctionDescription']} endDate={ele['endDate']}  />})}
      </SimpleGrid>}
        </Box>
  )
}

export default AdminPending