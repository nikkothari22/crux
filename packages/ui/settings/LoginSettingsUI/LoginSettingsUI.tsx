import { Table, Thead, Tr, Th, Td, Text, Switch, Box, HStack, Divider, Stack, Button, Input, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { BsGoogle } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

interface Props {

}

export const LoginSettingsUI = (props: Props) => {

    const [isSignupEnabled, setSignup] = useState(false);

    return (
        <>
            {/* Upload Logo */}
            <SimpleGrid columns={2} spacing={20}>
                <Stack>
                    <Text mt={6} fontWeight="semibold" fontSize="lg">Logo</Text>
                    <Text color="gray.600" fontSize="sm">Upload the logo that you want to be displayed on the login screen</Text>
                </Stack>
                <HStack spacing={4} mt={8}>
                    <Button variant="outline">Choose file</Button>
                    <Button>Upload</Button>
                </HStack>
            </SimpleGrid>
            <Divider mt={8} maxW="90vw" />

            {/* Input Login Heading */}
            <HStack spacing={24} mt={8}>
                <Text fontWeight="semibold" fontSize="lg">Login form heading</Text>
                <Input placeholder="Ex: 'Welcome back'" maxWidth="685" />
            </HStack>
            <Divider mt={8} maxW="90vw" />

            {/* Is signup enabled */}
            <Box mb={4} mt={8}>
                <HStack spacing={24}>
                    <Text fontWeight="semibold" fontSize="lg">Enable Email Signup</Text>
                    <Switch onChange={() => setSignup(!isSignupEnabled)} />
                </HStack>
            </Box>

            {isSignupEnabled &&
                <>
                    <Divider mt={8} maxW="90vw" />
                    <HStack spacing={20} mt={8}>
                        <Text fontWeight="semibold" fontSize="lg">Signup form heading</Text>
                        <Input placeholder="Ex: 'Create your account'" maxWidth="685" />
                    </HStack>
                </>
            }
            <Divider mt={8} maxW="90vw" />

            {/* Providers list */}
            <Text py={4} mt={2} fontWeight="semibold" fontSize="lg">OAuth Providers</Text>
            <Box boxShadow="base" mt={2} mr={50} mb={16}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Provider</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tr>
                        <Td><HStack spacing={2}><HiOutlineMail size={18} /><Text>Email/Password</Text></HStack></Td>
                        <Td><Switch /></Td>
                    </Tr>
                    <Tr>
                        <Td><HStack spacing={2}><BsGoogle /><Text>Google</Text></HStack></Td>
                        <Td><Switch /></Td>
                    </Tr>
                    <Tr>
                        <Td><HStack spacing={2}><FaFacebook /><Text>Facebook</Text></HStack></Td>
                        <Td><Switch /></Td>
                    </Tr>
                    <Tr>
                        <Td><HStack spacing={2}><FaGithub /><Text>Github</Text></HStack></Td>
                        <Td><Switch /></Td>
                    </Tr>
                    <Tr>
                        <Td><HStack spacing={2}><FaTwitter /><Text>Twitter</Text></HStack></Td>
                        <Td><Switch /></Td>
                    </Tr>
                </Table >
            </Box >
        </>
    )
}