import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'

interface PageLink {
    name: string,
    url: string,
    isCurrent?: boolean
}
interface Props {
    currentPage?: string,
    showHome?: boolean,
    pages?: PageLink[],
    previousPage?: string,
    previousPageLink?: string,
};

export const BreadCrumb = ({ pages, showHome }: Props) => {

    const previousPageLinkColor = useColorModeValue("gray.600", "gray.400")
    const currentPageLinkColor = useColorModeValue("gray.800", "gray.200")

    return (
        <>
            <Breadcrumb
                alignItems={'center'}
                display="flex"
                alignContent={'center'}
                spacing={{ base: '2px', md: '6px', lg: '8px' }}
                mb="2"
                separator={<ChevronRightIcon
                    color='gray.500' />}>

                {pages && pages.map(({ name, url, isCurrent }) => <BreadcrumbItem isCurrentPage={isCurrent} key={url}>
                    <BreadcrumbLink textTransform="uppercase" fontWeight={"600"} color={isCurrent ? currentPageLinkColor : previousPageLinkColor} fontSize={{ base: 'xs', md: 'xs', lg: 'xs' }}>
                        <Text textTransform="uppercase" as={Link} href={url} color={isCurrent ? currentPageLinkColor : previousPageLinkColor}>
                            {name}
                        </Text>
                    </BreadcrumbLink>
                </BreadcrumbItem>)}

            </Breadcrumb>
        </>
    )
};