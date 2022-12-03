import { Badge, Box, Text } from '@mantine/core'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../utils/ProductCard'

function Auction() {
  const params = useParams()

  const [data , setData] = useState('')
  const [pdata ,setPdata] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    async function fetchDetails(){
        const resp = await axios.post('https://product-api-six.vercel.app/getAuctionDetailByAuctionId',{
            auctionId : params.aid
        })
        console.log(resp.data.auctionDetails[0]['productIds'])
        setLoading(false)
        setData(resp.data.auctionDetails[0])

        for(const x of resp.data.auctionDetails[0]['productIds']){
            const res = axios.post('',{

            })
            console.log(res)
            // setPdata([...pdata , res] )
        }


    }

    fetchDetails()
    

  },[])

//   console.log(params)
if(loading){
    return (<div><p>Loading...</p></div>)
}
console.log(data , 'data')
    return (
    <Box style={{backgroundColor : 'orange' , padding : '20px' }}>
        <h1 style={{color : 'red' , textAlign : 'center'}}>{data['auctionName']}</h1>
        <Text p='md'>{data['auctionDescription']}</Text>
        <Text color='white'p='md' style={{textAlign:'center'}} variant='filled'>Ends At : {data['endDate']}</Text>
        <ProductCard name='NANNA' price='34' desc='lorem scvbsvb'  />
    </Box>
  )
}

export default Auction