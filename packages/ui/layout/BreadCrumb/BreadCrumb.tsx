import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

type Props = {
    currentPage: string,
};

export const BreadCrumb = ({ currentPage }: Props) => {

    const previousPageLinkColor = useColorModeValue("gray.600", "gray.400")
    const currentPageLinkColor = useColorModeValue("gray.800", "gray.200")

    return (
        <>
            <Breadcrumb spacing='8px' mb={10} separator={<ChevronRightIcon color='gray.500' />}>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/' color={previousPageLinkColor}>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={currentPageLinkColor}>{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>

            </Breadcrumb>
        </>
    )
};