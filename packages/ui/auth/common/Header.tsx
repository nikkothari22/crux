import { Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'

interface Props {
    logo: {
        light: string,
        dark: string
    },
    heading: string,
    text?: string
}

export const Header = ({ logo, heading, text }: Props) => {

    const colorLogo = useColorModeValue(logo.light, logo.dark)
    return (
        <>
            {colorLogo && <Image src={colorLogo} mx="auto" h="8" />}
            <Stack spacing={2}>
                <Heading textAlign="center" size="lg" fontWeight="extrabold">
                    {heading}
                </Heading>
                {text && <Text textAlign="center" size="lg" fontWeight="medium">{text}</Text>}
            </Stack>
        </>
    )
}
