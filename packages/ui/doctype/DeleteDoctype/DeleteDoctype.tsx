import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"


interface Props {
    isOpen: boolean,
    onClose: VoidFunction,
    deleteAction: () => Promise<void>
}

export const DeleteDoctype = ({ isOpen, onClose, deleteAction }: Props) => {

    const [loading, setLoading] = useState(false)
    const cancelRef = useRef<HTMLButtonElement>(null)

    const deleteClicked = () => {
        setLoading(true)
        deleteAction().finally(() => {
            setLoading(false)
            onClose()
        })
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Doctype
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteClicked} isLoading={loading} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    )
}