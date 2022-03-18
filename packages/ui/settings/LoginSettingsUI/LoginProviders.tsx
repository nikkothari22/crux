import { Box, HStack, Switch, Text, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback } from "react";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LoginProvider } from "types";

interface Props {
    providers: LoginProvider[],
    updateSettings: (data: LoginProvider[]) => void,
}

const LoginProviders = ({ providers, updateSettings }: Props) => {

    const toggleProvider = useCallback((provider: LoginProvider) => {
        if (providers.includes(provider)) {
            updateSettings(providers.filter(p => p !== provider))
        } else {
            updateSettings([...providers, provider])
        }
    }, [providers, updateSettings])
    return (
        <>
            <Text mt={{ base: 5, md: 6, lg: 8 }}
                fontWeight="semibold"
                fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                OAuth Providers
            </Text>
            <Box boxShadow="base" mt={{ base: 5, md: 6, lg: 8 }} maxW="80vw">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Provider</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <HStack spacing={2}>
                                    <HiOutlineMail size={18} />
                                    <Text fontSize={{ base: '14px', md: '15px', lg: '16px' }}>
                                        Email/Password
                                    </Text>
                                </HStack>
                            </Td>
                            <Td><Switch isChecked={providers.includes('password')} onChange={() => toggleProvider('password')} /></Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <HStack spacing={2}>
                                    <BsGoogle />
                                    <Text fontSize={{ base: '14px', md: '15px', lg: '16px' }}>
                                        Google
                                    </Text>
                                </HStack>
                            </Td>
                            <Td><Switch isChecked={providers.includes('google')} onChange={() => toggleProvider('google')} /></Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <HStack spacing={2}>
                                    <FaFacebook />
                                    <Text fontSize={{ base: '14px', md: '15px', lg: '16px' }}>
                                        Facebook
                                    </Text>
                                </HStack>
                            </Td>
                            <Td><Switch isChecked={providers.includes('facebook')} onChange={() => toggleProvider('facebook')} /></Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <HStack spacing={2}>
                                    <FaGithub />
                                    <Text fontSize={{ base: '14px', md: '15px', lg: '16px' }}>
                                        Github
                                    </Text>
                                </HStack>
                            </Td>
                            <Td><Switch isChecked={providers.includes('github')} onChange={() => toggleProvider('github')} /></Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <HStack spacing={2}>
                                    <FaTwitter />
                                    <Text fontSize={{ base: '14px', md: '15px', lg: '16px' }}>
                                        Twitter
                                    </Text>
                                </HStack>
                            </Td>
                            <Td><Switch isChecked={providers.includes('twitter')} onChange={() => toggleProvider('twitter')} /></Td>
                        </Tr>
                    </Tbody>
                </Table >
            </Box >
        </>
    )
};

export default LoginProviders;