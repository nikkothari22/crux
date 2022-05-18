import { Text, Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Stack, HStack } from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
    data: any[],
    isOpen: boolean,
    onClose: () => void,
    uploadData: () => Promise<any>,
    tableName: string,
}

export const UploadToDatabase = ({ data, isOpen, onClose, uploadData, tableName }: Props) => {

    const [uploading, setUploading] = useState(false)
    const toast = useToast()

    const uploadToDatabase = () => {
        if (data) {
            console.log('Data:', data)
            setUploading(true)
            onClose()
            uploadData().then((x) => {
                console.log("Data uploaded successfully:", x)
                toast({
                    title: 'Data uploaded',
                    status: 'success',
                    duration: 1000,
                    position: 'bottom',
                    variant: 'solid',
                    isClosable: true,
                })
            })
                .catch((error: Error) => showErrorToast(error))
                .finally(() => setUploading(false))
        }
    }

    const showErrorToast = (error: Error) => {
        console.error("error uploading data", error)
        toast({
            duration: 2000,
            position: 'bottom',
            variant: 'solid',
            isClosable: true,
            status: 'error',
            title: 'Error',
            description: `${error.message}`
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Upload data
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={2}>
                        <Text fontWeight="semibold" fontSize="lg">Are you sure you want to continue?</Text>
                        <HStack><Text fontSize="md" as="p">Data will be added to the table:</Text><Text fontSize="md" as="p" fontWeight="semibold">{tableName}</Text></HStack>
                        <Text fontSize="sm" as="p">You cannot undo this action. Make sure all the details about the table are correct and you have appropriate security rules/ policies in place.</Text>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={() => uploadToDatabase()}
                            isLoading={uploading}
                            loadingText="Uploading..."
                        >Upload</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}