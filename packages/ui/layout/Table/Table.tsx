import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'

type Props = {}

export const Table = (props: Props) => {
    return (
        <>
            <Text>Table</Text>
            <SimpleGrid columns={{ base: 4, md: 4, lg: 6 }} spacing={0}>
                <VStack>
                    <Box><Text>one</Text></Box>
                    <Box><Text>two</Text></Box>
                    <Box><Text>three</Text></Box>
                </VStack>
                <VStack>
                    <Box><Text>one</Text></Box>
                    <Box><Text>two</Text></Box>
                    <Box><Text>three</Text></Box>
                </VStack>
                <VStack>
                    <Box><Text>one</Text></Box>
                    <Box><Text>two</Text></Box>
                    <Box><Text>three</Text></Box>
                </VStack>
                <VStack>
                    <Box><Text>one</Text></Box>
                    <Box><Text>two</Text></Box>
                    <Box><Text>three</Text></Box>
                </VStack>
            </SimpleGrid>
        </>
    )
}