import { Button, ButtonProps, HStack, Icon, IconProps, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { LoginProvider } from 'types'

interface Props extends SocialButtonIconText, ButtonProps {
    onClick: VoidFunction
}

export const SocialButton = ({ icon, text, onClick }: Props) => {

    const variant = useColorModeValue('outline', 'solid')
    return (
        <Button color="currentColor" variant={variant} onClick={onClick} leftIcon={icon}>
            {/* <HStack spacing={2}> */}
            {/* {icon} */}
            {text}
            {/* <Text>{text}</Text> */}
            {/* </HStack> */}
        </Button>
    )
}
interface SocialButtonIconText {
    icon: React.ReactElement,
    text: string,
}
export const getSocialButtonPropsFromProvider = (provider: LoginProvider): SocialButtonIconText => {

    let icon = <Icon />
    let text = "Continue with "

    let iconProps: IconProps = {
        w: 4,
        h: 4
    }
    switch (provider) {
        case 'facebook':
            icon = <Icon {...iconProps} as={FaFacebook} color='blue.600' />
            text += "Facebook"
            break;
        case 'google':
            icon = <Icon {...iconProps} as={FcGoogle} />
            text += "Google"
            break;
        case 'github':
            icon = <Icon {...iconProps} as={FaGithub} />
            text += "Github"
            break;
        case 'twitter':
            icon = <Icon {...iconProps} as={FaTwitter} color="blue.400" />
            text += "Twitter"
            break;
    }

    return { icon, text }
} 
