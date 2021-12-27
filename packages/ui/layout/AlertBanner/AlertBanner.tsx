import { Alert, AlertIcon, AlertProps, Box, Text } from '@chakra-ui/react'

interface Props extends AlertProps {
    heading?: string,
    children?: React.ReactNode
}

export const AlertBanner = ({ variant = "left-accent", heading, children, ...props }: Props) => {

    return (
        <Alert variant={variant} {...props} >
            <AlertIcon />
            <Box>
                {heading && <Text fontSize="sm" fontWeight="medium">{heading}</Text>}
                {children && <Text fontSize="small">{children}</Text>}
            </Box>
        </Alert>
    )
}