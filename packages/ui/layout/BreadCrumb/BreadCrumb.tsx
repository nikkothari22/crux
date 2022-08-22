import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

interface PageLink {
    name: string,
    url: string,
    isCurrent?: boolean
}
interface Props {
    pages: PageLink[],
};
//TODO: BreadCrumb needs to be changed to other name - maybe "Page Breadcrumb or Page Nav"
export const BreadCrumb = ({ pages }: Props) => {

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

                {pages.map(({ name, url, isCurrent }) => <BreadcrumbItem isCurrentPage={isCurrent} key={url}>
                    <NextLink href={url} passHref prefetch>
                        <BreadcrumbLink color={isCurrent ? currentPageLinkColor : previousPageLinkColor}>
                            <Text textTransform="uppercase" fontWeight={"600"} color={isCurrent ? currentPageLinkColor : previousPageLinkColor} fontSize={{ base: 'xs', md: 'xs', lg: 'xs' }}>
                                {name}
                            </Text>
                        </BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>)}

            </Breadcrumb>
        </>
    )
};