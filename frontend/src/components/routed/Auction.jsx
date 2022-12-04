import { Badge, Box, Button, Center, Grid, Group, SimpleGrid, Stack, Text, Title , Notification, Affix} from '@mantine/core'
import { IconX } from '@tabler/icons'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../utils/ProductCard'

function Auction() {
  const params = useParams()

  const admin = window.location.pathname.includes('/admin')

  const [msg , setMsg] = useState('')

  console.log(params , window.location.pathname)

  const changeStatus = async()=>{
    console.log(data , 'DATATTATATTATATA')
    const resp = await axios.post('https://product-api-six.vercel.app/changeApproveStatus',{
        apiId : 'admin',
        newStatus : !data.approveStatus,
        auctionId: params.aid
    })
    async function fetchDetails(){
        const resp = await axios.post('https://product-api-six.vercel.app/getAuctionDetailByAuctionId',{
            auctionId : params.aid
        })
        
        setPdata([])
        setData(resp.data.auctionDetails[0])

        for(const x of resp.data.auctionDetails[0]['productIds']){
            const res = await axios.post('https://product-api-six.vercel.app/getProductDetailByProductId',{
                productId : x
            })
            console.log(res.data.productDetails[0] , 'prodDEtail')
            setPdata(pdata => [...pdata ,res.data.productDetails[0] ])
            
        }
        setLoading(false)
    }

    fetchDetails()
  }

  const [data , setData] = useState('')
  const [pdata ,setPdata] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    async function fetchDetails(){
        const resp = await axios.post('https://product-api-six.vercel.app/getAuctionDetailByAuctionId',{
            auctionId : params.aid
        })
        console.log(resp.data.auctionDetails , 'aaaaaaaaa')
        
        setData(resp.data.auctionDetails[0])

        for(const x of resp.data.auctionDetails[0]['productIds']){
            const res = await axios.post('https://product-api-six.vercel.app/getProductDetailByProductId',{
                productId : x
            })
            console.log(res.data.productDetails[0] , 'prodDEtail')
            setPdata(pdata => [...pdata ,res.data.productDetails[0] ])
            
        }
        setLoading(false)
    }

    fetchDetails()
    console.log(pdata , 'pdata')

    return ()=>{
        setPdata([])
        setData('')
    }
    

  },[])

//   console.log(params)
if(loading){
    return(<Box m={0} pt={50} style={{backgroundColor : '#C7D6D4' , minHeight : '90vh'}}><h1 style={{color : 'black' ,textAlign : 'center'}}>Loading...</h1></Box>)
}
console.log( data['approveStatus'] , 'data')

const st = (data['approveStatus']) ? 'Accepted' : 'Under Verification'
    return (
        <Box p='md' m={0} style={{backgroundColor : '#C7D6D4' , color : '#ecb365' , minHeight : '90vh'}}>

        {msg.length > 0 && <Affix position={{ bottom: 20, right: 20 }}><Notification icon={<IconX size={18} />} color="red"><Text>{msg}</Text></Notification></Affix>}

        <Grid align='center' justify='center' style={{textAlign : 'center'}}>
            <h1 style={{color : '#00867c' , textAlign : 'center' , fontWeight : 800}}>{data['auctionName']}</h1><Badge mx='lg' variant="filled" p='md' style={{textAlign:'center' , backgroundColor:"#b64d57" , color : 'white'}}><Text color='white'>Ends At : {data['endDate']}</Text></Badge>
        </Grid>
        <h2 style={{color : 'black' , fontWeight : 600 , fontSize : '2rem' ,paddingLeft: '12px'  , paddingBottom : '0px'}}>Description : </h2>
        <Title p='md' pt={0} order={3} style={{fontWeight : 400}} color='#000d0c'>{data['auctionDescription']}</Title>
                {admin && <Center><Button onClick={()=>{changeStatus()}} color='green'>Change Status</Button><Title mx='md' order={2} color='green'>{st} </Title> </Center>}
        <Title  style={{textAlign : 'center' , fontFamily : 'Bitter' , color: 'black' , marginBottom : '25px' , fontWeight : 600}}>Products in this Auction for Grabs : </Title>
        <SimpleGrid cols={3}>{pdata?.map((ele)=><ProductCard bids={ele['totalBid']} aid={ele['auctionId']} pid={ele['productId']} name={ele['productName']} price={ele['basePrice']} desc={ele['productDescription']}  />)}</SimpleGrid>
        {/* <ProductCard name='NANNA' price='34' desc='lorem scvbsvb'  /> */}
    </Box>
  )
}

export default Auction