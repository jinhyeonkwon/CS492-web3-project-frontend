import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { Sepolia } from '@thirdweb-dev/chains'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../utils/theme'
import { NftContractProvider } from '../contexts/NftContractProvider'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
// const chainId = ChainId.Goerli

const activeChainId: number = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider activeChain={activeChainId}>
        <NftContractProvider>
          {getLayout(<Component {...pageProps} />)}
        </NftContractProvider>
      </ThirdwebProvider>
    </ChakraProvider>
  )
}

export default MyApp
