import { VStack ,Image,Text, Button} from '@chakra-ui/react'
import React from 'react'

const Card = ({amount,img,checkouthandler={checkouthandler}}) => {
  return (
   <VStack>
    <Image src={img} boxSize={"64"} objectFit={"cover"}/>
    <Text>₹{amount}</Text>
    <Button colorScheme='facebook' onClick={()=>checkouthandler(amount)} >Buy Now</Button>
   </VStack>
  )
}

export default Card