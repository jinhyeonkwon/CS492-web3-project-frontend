import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NULL_ADDRESS } from '../../utils/const'
import { NftImage } from './NftImage'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import DetailModal from './DetailModal'
const convert = require('xml-js')

export type NftListItemProps = {
  // TODO Define correct nft type
  token_id: any
  token: any
}

const Component: React.FC<NftListItemProps> = ({ token_id = 0, token }) => {
  // const [animalType, setAnimalType] = useState('')
  // const [level, setLevel] = useState('')
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  // if (
  //   (token_id != 0) &&
  //   (token_id != undefined) &&
  //   (animalType != '') &&
  //   (level != '')
  // ) {
  //   const { data: _animal_type } = useContractRead(contract, 'getAnimalTypes', [
  //     token_id,
  //   ])
  //   const { data: _level } = useContractRead(contract, 'getLevels', [token_id])
  //   // setAnimalType(parseInt(_animal_type, 10))
  //   // setLevel(parseInt(_level, 10))
  //   setAnimalType(_animal_type)
  //   setLevel(_level)
  // }

  const data = convert.xml2json(atob(token.metadata.image.split(',')[1]), {
    compact: true,
    spaces: 4,
  })
  const parsedimage = JSON.parse(data)
  console.log(JSON.stringify(parsedimage))

  const level = parseInt(
    parsedimage.svg.text[1]._text.toString().split(':')[1].replace(/\s+/g, ''),
    10
  )
  const animalType = parseInt(
    parsedimage.svg.text[2]._text.toString().split(':')[1].replace(/\s+/g, ''),
    10
  )
  const cutoffdate = parseInt(
    parsedimage.svg.text[3]._text.toString().split(':')[1].replace(/\s+/g, ''),
    10
  )

  const imageUrl = `/assets/nft_image/${animalType}_${level}.png`
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  // if (animalType == 3) {
  //   animalType = 1
  // }

  // alert(animalType)
  // alert(level)
  console.log(token_id, animalType, level)
  return (
    <div onClick={() => handleOpenModal()}>
      <DetailModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        tokenId={token.metadata.id}
        level={level}
        animalType={animalType}
        cutoffdate={cutoffdate}
        imageUrl={imageUrl}
      />

      <Box position="relative">
        <Box opacity={token.owner === NULL_ADDRESS ? 0.2 : 1.0}>
          <NftImage imageUri={imageUrl} />
        </Box>
        <Text
          as="h4"
          fontSize={{ base: 'sm', md: 'lg' }}
          mt={2}
          textAlign="center"
          fontWeight="bold"
        >
          {token.metadata.name}
        </Text>
      </Box>
    </div>
  )
}

export { Component as NftListItem }
