import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'
import { Fade } from '../elements/Fade'
import { NftListItem } from '../elements/NftListItem'
import { NoListItems } from '../elements/NoListItems'
import { useContract, useContractRead } from '@thirdweb-dev/react'

const Component: React.FC = () => {
  const [allTokens, setAllTokens] = useState<Array<any>>([])
  const store = useContext(NftContractContext)
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  useEffect(() => {
    setAllTokens(store.allTokens)
  }, [store])
  return (
    <Fade>
      <Box maxW="8xl" mx="auto">
        <SimpleGrid
          columns={{
            base: 2,
            md: 3,
            lg: 4,
            xl: 5,
            '2xl': 6,
          }}
          spacing={{ base: 3, xl: 6 }}
          py={6}
        >
          {allTokens.map((token, index) => {
            // for render custom image
            const tokenId = token.metadata.id
            return (
              <React.Fragment key={index}>
                <NftListItem token_id={tokenId} token={token} />
              </React.Fragment>
            )
          })}
          {allTokens.length == 0 && <NoListItems />}
        </SimpleGrid>
      </Box>
    </Fade>
  )
}

export { Component as Collection }
