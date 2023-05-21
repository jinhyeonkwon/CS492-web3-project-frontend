import { useContract, useContractWrite, useNFTDrop } from '@thirdweb-dev/react'
import { useContext } from 'react'

import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from '@thirdweb-dev/react'

import { NftContractContext } from '../contexts/NftContractProvider'
export const useMint = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const store = useContext(NftContractContext)
  const { mutateAsync: mintCall, isLoading } = useContractWrite(contract, "mint")

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const [, switchNetwork] = useNetwork()
  const isOnWrongNetwork = useNetworkMismatch()

  const mint = async () => {
    if (!address) {
      connectWithMetamask()
      return
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))
      return
    }

    store.setIsClaiming && store.setIsClaiming(true)

    try {
      alert(contract)
      //@ts-ignore
      const data = await mintCall();
      alert(data)
      alert(`Successfully minted NFT!`)
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      store.setIsClaiming && store.setIsClaiming(false)
    }
  }

  return { mint }
}
