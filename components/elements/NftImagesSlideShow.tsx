import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'

import { NftImage } from './NftImage'

const Component: React.FC = () => {
  const [rand, setRand] = useState<number>(0)
  const [rand2, setRand2] = useState<number>(0)

  const [imgUrl, setImgUrl] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      setRand(Math.random())
      setRand2(Math.random())
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const num = Math.floor(rand * 3)
    const num2 = Math.floor(rand2 * 3)
    setImgUrl(`/assets/nft_image/${num}_${num2}.png`)
  }, [rand])

  return imgUrl ? (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={imgUrl}
        initial={{ x: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <NftImage imageUri={imgUrl} />
      </motion.div>
    </AnimatePresence>
  ) : (
    <></>
  )
}

export { Component as NftImagesSlideShow }
