import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FaMoon } from 'react-icons/fa'
import { BsFillSunFill } from 'react-icons/bs'

interface Props extends Partial<IconButtonProps> {

}

export const ColorModeButton = (props: Props) => {

    const { toggleColorMode } = useColorMode()

    const label = useColorModeValue('Switch to dark mode', 'Switch to light mode')

    const icon = useColorModeValue(<FaMoon />, <BsFillSunFill />)
    return (
        <IconButton icon={icon} aria-label={label} onClick={toggleColorMode} {...props} />
    )
}
