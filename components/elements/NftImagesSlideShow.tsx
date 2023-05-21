import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { NftContractContext } from '../../contexts/NftContractProvider'

import { NftImage } from './NftImage'

const Component: React.FC = () => {
  const [rand, setRand] = useState<number>(0)
  const [imgUrl, setImgUrl] = useState<string>('')
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRand(Math.random())
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRand(Math.random())
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const num = Math.floor(rand * 3) + 1
    setImgUrl(`/assets/nft_image/${num}.png`)
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
