import NextLink from "next/link"
import { AllHTMLAttributes } from "react"

interface ILink extends AllHTMLAttributes<null> {
    href: string
}

export default function Link({
href,
children,
className,
...rest
}: ILink) {
    return <NextLink href={href} className={"text-blue-300 hover:text-blue-500" + ` ${className}`}>
        {children}
    </NextLink>
}