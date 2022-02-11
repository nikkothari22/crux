import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

type Props = {
    currentPage: string,
    previousPage?: string,
    previousPageLink?: string,
};

export const BreadCrumb = ({ currentPage, previousPage, previousPageLink }: Props) => {

    const previousPageLinkColor = useColorModeValue("gray.600", "gray.400")
    const currentPageLinkColor = useColorModeValue("gray.800", "gray.200")

    return (
        <>
            <Breadcrumb spacing={{ base: '2px', md: '6px', lg: '8px' }} mb={{ base: 8, md: 10, lg: 10 }} separator={<ChevronRightIcon color='gray.500' />}>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/' color={previousPageLinkColor}>
                        <Text fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                            Home
                        </Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {previousPage &&
                    <BreadcrumbItem>
                        <BreadcrumbLink href={previousPageLink} color={previousPageLinkColor}>
                            <Text fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                                {previousPage}
                            </Text>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                }

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={currentPageLinkColor}>
                        <Text fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}>
                            {currentPage}
                        </Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>

            </Breadcrumb>
        </>
    )
};