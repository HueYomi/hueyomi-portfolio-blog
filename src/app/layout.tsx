import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/ChakraProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/AnimatedBackground'
import { Box } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hue Yomi Portfolio Blog',
  description: 'Personal portfolio and blog website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AnimatedBackground />
          <Box minH="100vh" display="flex" flexDirection="column">
            <Header />
            <Box as="main" flex="1" pt="60px">
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  )
} 