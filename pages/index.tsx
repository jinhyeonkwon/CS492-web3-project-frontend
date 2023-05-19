import type { NextPage } from 'next'
import Head from 'next/head'
import { Minting } from '../components/templates/Minting'
import { CommonLayout } from '../layouts/CommonLayout'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import { Fade } from '../components/elements/Fade'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Minting />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default Home
