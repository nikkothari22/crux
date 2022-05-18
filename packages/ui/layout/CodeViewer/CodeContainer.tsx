import { Box, BoxProps, Button, ButtonProps, useClipboard } from "@chakra-ui/react";

export function CodeContainer(props: BoxProps) {
    return <Box padding='5' rounded='8px' my='8' bg='#011627' {...props} />
}

interface CopyButtonProps extends ButtonProps {
    code: string
}

export function CopyButton({ code, ...props }: CopyButtonProps) {
    const { hasCopied, onCopy } = useClipboard(code)

    return (
        <Button
            size='sm'
            position='absolute'
            textTransform='uppercase'
            colorScheme='teal'
            fontSize='xs'
            height='24px'
            top={0}
            zIndex='1'
            right='1.25em'
            {...props}
            onClick={onCopy}
        >
            {hasCopied
                ? "Copied!"
                : "Copy"}
        </Button>
    )
}