import { Box, Center, Grid, Image, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { useState } from 'react';
import Land from '../../images/landing.jpg'
import Logo from '../../images/Logo12.png'

function LandingPage() {
  return (
    <Grid align='flex-start' justify='space-evenly'>
        <Grid.Col span={8}>
            <Image radius='md' my={50} src={Land} fit='fill' />
        </Grid.Col>

        <Grid.Col span={3} >
            <Stack >
                <Image radius='md' my={50} src={Logo} fit='fill' />
                <Title color='black' style={{textAlign : 'center'}}>Bidding Blocks <br/> Let your Bid Begin!!</Title>
                <Text mt='lg' style={{color : 'black' , fontSize : '1.3rem' , textAlign : 'center'}}>
                    Online Auction System with security of blockchain
                </Text>
            </Stack>

        </Grid.Col>
        </Grid>
  )
}

export default LandingPage