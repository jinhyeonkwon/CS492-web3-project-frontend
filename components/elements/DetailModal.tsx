import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Card,
  Text,
  useDisclosure,
  Stack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { NftImage } from './NftImage'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { time } from 'console'

const DetailModal: React.FC<any> = ({
  tokenId,
  isOpen,
  onClose,
  level,
  animalType,
  cutoffdate,
  imageUrl,
}) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  //onst cutoffdate = '1684755673'
  const { mutateAsync: trainCall, isLoading } = useContractWrite(
    contract,
    'train'
  )
  let mainText = useColorModeValue('gray.800', 'white')
  let secondaryText = useColorModeValue('gray.400', 'gray.400')

  const trainToken = async (tokenId: any) => {
    try {
      const data = await trainCall([tokenId])
      alert('train success!')
      window.location.reload()
    } catch (err) {
      alert(`train failure : ${err}`)
    }
  }

  const getAnimalTypeString = (animalType: any) => {
    switch (animalType) {
      case 0:
        return 'cat'
      case 1:
        return 'dog'
      case 2:
        return 'rabbit'
      default:
        return 'unknown'
    }
  }
  // https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
  const timestampToDate = (timestamp: string) => {
    const dateTimestamp = new Date(parseInt(timestamp, 10) * 1000)
    return dateTimestamp.toLocaleDateString()
  }

  function timeSince(date: any) {
    //@ts-ignore
    var seconds = Math.floor((date - new Date()) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + ' years'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' days'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
  }

  const dateTimestamp = new Date(parseInt(cutoffdate, 10) * 1000)
  const readyToTrain = Math.floor((dateTimestamp - new Date()) / 1000) <= 0

  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Token Detail Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Card maxW="sm"> */}
            <NftImage imageUri={imageUrl} />
            <br />
            <br />
            <Flex justify="space-between" w="100%" px="36px">
              <Flex flexDirection="column">
                <Text
                  fontWeight="600"
                  color={mainText}
                  fontSize="xl"
                  textAlign="center"
                >
                  {getAnimalTypeString(animalType)}
                </Text>
                <Text color={secondaryText} fontWeight="500">
                  animalType
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text
                  fontWeight="600"
                  color={mainText}
                  fontSize="xl"
                  textAlign="center"
                >
                  {level}
                </Text>
                <Text color={secondaryText} fontWeight="500">
                  level
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text
                  fontWeight="600"
                  fontSize="xl"
                  color={mainText}
                  textAlign="center"
                >
                  {dateTimestamp.getFullYear() +
                    '/' +
                    (dateTimestamp.getMonth() + 1) +
                    '/' +
                    dateTimestamp.getDate()}
                  <br />
                  {dateTimestamp.getHours() +
                    ':' +
                    dateTimestamp.getMinutes() +
                    ':' +
                    dateTimestamp.getSeconds()}
                </Text>
                <Text color={secondaryText} fontWeight="500">
                  cutoffdate
                </Text>
              </Flex>
            </Flex>
            {/* <Stack mt="6" spacing="3">
              <Text fontSize="xl" cursor="pointer">
                tokenId: {tokenId}
              </Text>
              <Text fontSize="xl" cursor="pointer">
                level: {level}
              </Text>
              <Text fontSize="xl" cursor="pointer">
                animalType: {animalType}
              </Text>
              <Text fontSize="xl" cursor="pointer">
                cutoffdate: {cutoffdate}
              </Text>
            </Stack> */}
            {/* </Card> */}
            {/* 이미지 왼쪽 정렬로 수정*/}
          </ModalBody>

          <ModalFooter>
            <Button
              variant={readyToTrain ? 'solid' : 'ghost'}
              onClick={() => trainToken(tokenId)}
              isDisabled={readyToTrain == false || isLoading}
            >
              {isLoading
                ? 'Loading...'
                : readyToTrain
                ? 'Train'
                : timeSince(dateTimestamp) + ' left'}
            </Button>
            {/* true 로 되어있는 조건문이 unixtimestamp 검증 로직으로 바뀌어야 함*/}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DetailModal
