import { Table, Thead, Tbody, Tr, Th, Td, Switch, Box, HStack, VStack, } from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { BreadCrumb } from 'ui/layout';
import AdminPanelPage from '../../components/AdminPanelPage';
import enforceAuthenticated from '../../utils/enforceAuthenticated';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa'
import { BsGoogle } from 'react-icons/bs'

type Props = {};

const loginSettings = (props: Props) => {
    return (
        <>
            <BreadCrumb
                currentPage="Login Settings"
                previousPage="Settings"
                previousPageLink="/settings" />
            <Heading>Login Settings</Heading>
            <Text py={4} mt={2} fontWeight="semibold">Email Auth</Text>
            <Box boxShadow="base" mt={2} mr={50}>
                <Table variant='simple'>
                    <Tbody>
                        <Tr>
                            <Td>Enable Email Signup</Td>
                            <Td><Switch /></Td>
                        </Tr>
                        <Tr>
                            <Td>Double confirm email changes</Td>
                            <Td><Switch /></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
            <Text py={4} mt={4} fontWeight="semibold">External OAuth Providers</Text>
            <Box boxShadow="base" mt={2} mr={50}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Provider</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td><BsGoogle />Google</Td>
                            <Td><Switch /></Td>
                        </Tr>
                        <Tr>
                            <Td><FaFacebook />Facebook</Td>
                            <Td><Switch /></Td>
                        </Tr>
                        <Tr>
                            <Td><FaGithub />Github</Td>
                            <Td><Switch /></Td>
                        </Tr>
                        <Tr>
                            <Td><FaTwitter />Twitter</Td>
                            <Td><Switch /></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </>
    );
}

loginSettings.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminPanelPage>
            {page}
        </AdminPanelPage>
    )
}

export const getServerSideProps = enforceAuthenticated();

export default loginSettings;