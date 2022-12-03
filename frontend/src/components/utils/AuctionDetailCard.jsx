import { Badge, Box, Button, Group, Text } from '@mantine/core'
import React from 'react'
import "./AuctionDetailCard.css"
import { useNavigate } from "react-router-dom";

function AuctionDetailCard(props) {
  console.log(props)
  const navigate = useNavigate()
  return (
      <Box className="card" style={{margin : '20px', color:'white'}}>
        <h2 className='title' style={{color:'white'}}>{props.name}</h2>
        <div className="card__desc" color='white'>
          <p><Text style={{color:'white'}}>{props.desc}</Text></p>
        </div>
        
          <Group style={{ justifyContent : 'center' , marginBottom : '20px'}}>
            <Badge size='lg' variant='filled' className="card__host" style={{backgroundColor:'#4db6ab'}}><Text style={{color:'black'}}>{props.host}</Text></Badge>
            <Badge size='lg' className='card__status'><Text style={{color:'black'}}>{props.status}</Text></Badge>
            <Badge size='lg' className="card__category"><Text style={{color:'black'}}>End: {props.endDate}</Text></Badge>
            <Button style={{backgroundColor : '#b64d57' , borderRadius : '20px'}} onClick={()=>navigate(`/auctions/${props.id}`)}><Text style={{color:'black'}}>Show Details</Text></Button>
          </Group>
    </Box>
  )
}

export default AuctionDetailCard