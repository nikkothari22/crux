import { Button, Divider, HStack, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, useDisclosure, Flex } from "@chakra-ui/react";

type Props = {};

const LogoUpload = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <HStack spacing={{ base: 16, md: 28, lg: 24 }} mt={{ base: 5, md: 6, lg: 8 }}>
                <Stack>
                    <Text
                        fontWeight="semibold"
                        fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                        Logo
                    </Text>
                    <Text color="gray.600" fontSize={{ base: '12px', md: '14px', lg: '14px' }}>
                        Upload the logo that you want to be displayed on the login screen
                    </Text>
                </Stack>
                <Button
                    variant="outline"
                    onClick={onOpen}
                    maxW={{ base: '100px', md: '120px', lg: '160px' }}>
                    <Text
                        p={10}
                        fontSize={{ base: '12px', md: '14px', lg: '16px' }}>
                        Upload image
                    </Text>
                </Button>
            </HStack>

            <Divider mt={{ base: 5, md: 6, lg: 8 }} maxW="90vw" />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload your logo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>To support both light and dark color mode please upload your logo accordingly</Text>
                        <HStack spacing={10} mt={4}>
                            <Stack>
                                <HStack><Text fontWeight="semibold">logo: </Text><Text color="gray.600">light</Text></HStack>
                                <HStack><Text fontWeight="semibold">logo: </Text><Text color="gray.600">dark</Text></HStack>
                            </Stack>
                            <Stack spacing={3}>
                                <Button variant="link" colorScheme="blue">Add file</Button>
                                <Button variant="link" colorScheme="blue">Add file</Button>
                            </Stack>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Confirm
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default LogoUpload;