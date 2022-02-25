import { Box, SimpleGrid, Heading, Center } from '@chakra-ui/react'
import * as React from 'react'
import { FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline } from 'react-icons/fc'
import { Feature } from './Feature'

export const Features = () => (
  <Box
    as="section"
    maxW="5xl"
    mx="auto"
    py="12"
    px={{
      base: '6',
      md: '8',
    }}
  >
    <Center mt="3" mb="8">
      <Heading size="xl">Our Features</Heading>
    </Center>
    
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacingX="10"
      spacingY={{
        base: '8',
        md: '14',
      }}
    >
      <Feature title="Powered by AI" icon={<FcPrivacy />}>
        EasySign uses camera AI to provide real-time feedback on your sign language.
      </Feature>
      <Feature title="Content tailored to your needs" icon={<FcTimeline />}>
        We provide curated quizzes at various levels to help you learn interactively.
      </Feature>
      <Feature title="Comprehensive analytics" icon={<FcDoughnutChart />}>
        EasySign's dashboard provides essential insights into your progress over time.
      </Feature>
      <Feature title="Free for everyone" icon={<FcMultipleDevices />}>
        Our goal is to help the community by leveraging cutting edge technology. EasySign is free for unlimited use.
      </Feature>
    </SimpleGrid>
  </Box>
)