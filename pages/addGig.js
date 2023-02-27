import { Box, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useState } from 'react'
import AddGig from '../components/AddGig'
import DisplayGig from '../components/DisplayGig'
import ImageInput from '../components/ImageInput'
import TagsInput from '../components/TagsInput'
import Upload from '../components/Upload'

const addGig = ({ user }) => {
  return (

    <>
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">
        </script>
      </Head>

      <Stack>
        <AddGig />
        <DisplayGig />
        <Upload />
      </Stack>
    </>

  )
}

export default addGig
