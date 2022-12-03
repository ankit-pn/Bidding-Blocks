import { Badge, Box, Button, Group, Text } from '@mantine/core'
import React from 'react'
import "./AuctionDetailCard.css"
import { useNavigate } from "react-router-dom";

function AuctionDetailCard(props) {
  console.log(props)
  const navigate = useNavigate()
  return (
      <Box className="card" style={{margin : '20px'}}>
        <h2 className='title'>{props.name}</h2>
        <div className="card__desc">
          <p>{props.desc}</p>
        </div>
        
          <Group style={{ justifyContent : 'center' , marginBottom : '20px'}}>
            <Badge size='lg' variant='filled' color='yellow' className="card__host">{props.host}</Badge>
            <Badge size='lg' className='card__status'>{props.status}</Badge>
            <Badge size='lg' className="card__category">End: {props.endDate}</Badge>
            <Button style={{backgroundColor : '#0B5226' , borderRadius : '20px'}} onClick={()=>navigate(`/auctions/${props.id}`)}>Show Details</Button>
          </Group>
    </Box>
  )
}

export default AuctionDetailCard