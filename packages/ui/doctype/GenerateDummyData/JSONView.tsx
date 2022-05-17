import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { CodeContainer, CopyButton } from '../../layout/CodeViewer/CodeContainer'
import Highlight from '../../layout/CodeViewer/Highlight'
import theme from 'prism-react-renderer/themes/nightOwl'

type Props = {
    data: any,
    isOpen: boolean,
    onClose: () => void,
}

export const JSONView = ({ data, isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    JSON
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box position='relative' zIndex='0'>
                        <CodeContainer px='0' mb="4" overflow='hidden'>
                            <Highlight
                                codeString={JSON.stringify(data, null, 2)}
                                language={"json"}
                                theme={theme}
                            // metastring={ln}
                            // showLines={viewlines}
                            />
                        </CodeContainer>
                        <CopyButton top='4' code={JSON.stringify(data, null, 2)} />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}