import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons"

interface settingsProps {
    icon: IconType,
    title: string,
    link: string
}

export const SettingsButton = ({ icon, title, link }: settingsProps) => {

    const buttonColor = useColorModeValue("white", "gray.700")
    const iconColor = useColorModeValue("gray.500", "gray.400")

    return (
        <>
            <Link href={link} passHref={true}>
                <HStack px={4} py={4}
                    rounded="md"
                    boxShadow="base"
                    bg={buttonColor}
                    _hover={{ cursor: "pointer" }}>
                    <Icon as={icon} fontSize="xl" color={iconColor} />
                    <Text fontSize="lg">{title}</Text>
                </HStack>
            </Link>
        </>
    );
}