import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { NftImage } from './NftImage'
import { useContract, useContractWrite } from '@thirdweb-dev/react'

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

  const { mutateAsync: trainCall, isLoading } = useContractWrite(
    contract,
    'train'
  )

  const trainToken = async (tokenId: any) => {
    try {
      const data = await trainCall([tokenId])
      alert('train success!')
      window.location.reload()
    } catch (err) {
      alert(`train failure : ${err}`)
    }
  }

  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Token Detail Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>tokenId: {tokenId}</p>
            <p>level: {level}</p>
            <p>animalType: {animalType}</p>
            <p>cutoffdate: {cutoffdate}</p>
            {/* cutoff date 날짜 형태로 변환 (지금은 second 단위 유닉스 타임스템프)*/}
            <NftImage imageUri={imageUrl} />
            {/* 이미지 왼쪽 정렬로 수정*/}
          </ModalBody>

          <ModalFooter>
            <Button
              variant={true ? 'solid' : 'ghost'}
              onClick={() => trainToken(tokenId)}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Train'}
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
