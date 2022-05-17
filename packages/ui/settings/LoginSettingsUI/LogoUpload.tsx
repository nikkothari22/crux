import { Box, Button, Divider, Image, HStack, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Icon, Input, FormControl, FormHelperText, ButtonGroup } from "@chakra-ui/react";
import { FaMoon } from 'react-icons/fa'
import { BsFillSunFill } from 'react-icons/bs'
import { useFormContext } from "react-hook-form";
// import Image from 'next/image'

type Props = {
    logoLightMode: string,
    logoDarkMode: string,
};

const LogoUpload = ({ logoLightMode, logoDarkMode }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register } = useFormContext();
    const logoUploadGraphic = require("../../assets/logoUpload.svg") as string;

    const onButtonClicked = () => {
        onClose()
    }

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
                    {logoDarkMode || logoLightMode ? "Change Logo" : "Add Logo"}
                </Button>

                <HStack spacing={4}>
                    {logoLightMode ?
                        <Stack>
                            <Box p="4" border="1px">
                                <Image src={logoLightMode} width={100} />
                            </Box>
                            <Text fontSize="sm" fontWeight="light">logo: light mode</Text>
                        </Stack> : null}
                    {logoDarkMode ?
                        <Stack>
                            <Box backgroundColor="blackAlpha.800" p="4">
                                <Image src={logoDarkMode} width={100} />
                            </Box>
                            <Text fontSize="sm" fontWeight="light">logo: dark mode</Text>
                        </Stack> : null}
                </HStack>

            </HStack>

            <Divider mt={{ base: 5, md: 6, lg: 8 }} />

            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload your logo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <Box py={2}>
                                <Image src={logoUploadGraphic} alt="empty state graphic" height={200} />
                            </Box>
                            <Text as="p" fontSize="sm" mt="2" color="gray.600" align="center">To support both light and dark color mode please enter your logo URLs accordingly.</Text>
                            <HStack pl={24} py={4} spacing={6}>
                                <HStack>
                                    <FormControl>
                                        <Stack>
                                            <HStack><Icon as={BsFillSunFill} /><Text color="gray.600" fontWeight="semibold">light mode:</Text></HStack>
                                            <Input {...register("light")} />
                                            <FormHelperText fontSize="xs">Add image URL (light)</FormHelperText>
                                        </Stack>
                                    </FormControl>
                                </HStack>
                                <HStack>
                                    <FormControl>
                                        <Stack>
                                            <HStack><Icon as={FaMoon} height="3" /><Text color="gray.600" fontWeight="semibold">dark mode:</Text></HStack>
                                            <Input {...register("dark")} />
                                            <FormHelperText fontSize="xs">Add image URL (dark)</FormHelperText>
                                        </Stack>
                                    </FormControl>
                                </HStack>
                            </HStack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                            <Button
                                onClick={onButtonClicked}
                                colorScheme="blue"
                                type="submit">
                                Confirm
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default LogoUpload;