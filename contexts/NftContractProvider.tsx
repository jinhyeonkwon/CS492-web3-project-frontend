import {
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFTDrop,
  useUnclaimedNFTSupply,
  useContractRead,
} from '@thirdweb-dev/react'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { ethers } from 'ethers'

type Store = {
  isLoading: boolean
  allTokens: Array<any>
  isClaiming: boolean
  setIsClaiming?: Dispatch<SetStateAction<boolean>>
  spMenuOpened: boolean
  setSpMenuOpened?: Dispatch<SetStateAction<boolean>>
  ownedTokens: Array<any>
  setOwnedTokens?: Dispatch<SetStateAction<boolean>>
  claimPrice: string
  totalSupply: number
  claimedSupply: number
}

export const NftContractContext = createContext<Store>({
  isLoading: true,
  allTokens: [],
  isClaiming: false,
  spMenuOpened: false,
  ownedTokens: [],
  claimPrice: '',
  totalSupply: 0,
  claimedSupply: 0,
})

type Props = {
  children: React.ReactNode
}

const Component: React.FC<Props> = ({ children }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const address = useAddress()
  const [allTokens, setAllTokens] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClaiming, setIsClaiming] = useState<boolean>(false)
  const [spMenuOpened, setSpMenuOpened] = useState<boolean>(false)
  const [ownedTokens, setOwnedTokens] = useState<Array<any>>([])
  const [claimPrice, setClaimPrice] = useState<string>('')
  const [totalSupply, setTotalSupply] = useState<number>(0)
  const [claimedSupply, setClaimedSupply] = useState<number>(0)

  // const { data: unclaimedNft } = useUnclaimedNFTSupply(nftDrop)
  // const { data: claimedNft } = useClaimedNFTSupply(nftDrop)

  const { data: totalSupply_, isLoading: isLoading_ } = useContractRead(
    contract,
    'totalSupply'
  )
  const { data: allToken, isLoading: allToken_loading_ } = useContractRead(
    contract,
    'tokensOfOwner',
    [address]
  )

  useEffect(() => {
    setAllTokens(allToken)
    setIsLoading(false)
    setClaimPrice('0')
  }, [contract])

  useEffect(() => {
    if (address) {
      let owneds: Array<any> = []

      allTokens.map((token) => {
        if (token.owner == address) {
          owneds.push(token)
        }
      })

      setOwnedTokens(owneds)
    }

    setClaimedSupply(totalSupply_ || 0)
    setTotalSupply(totalSupply_ || 0)
  }, [allTokens])

  useEffect(() => {
    setAllTokens(allToken)
    setIsLoading(false)
    setClaimPrice('0')
  }, [isClaiming])

  const store: Store = {
    isLoading,
    allTokens,
    isClaiming,
    setIsClaiming,
    spMenuOpened,
    setSpMenuOpened,
    ownedTokens,
    claimPrice,
    claimedSupply,
    totalSupply,
  }

  return (
    <NftContractContext.Provider value={store}>
      {children}
    </NftContractContext.Provider>
  )
}

export { Component as NftContractProvider }
