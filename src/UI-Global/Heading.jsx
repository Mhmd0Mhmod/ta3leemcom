export default function Heading({ as, children, className='' }) {
    switch (as) {
        case "h1":
            return <h1 className={`text-4xl  ${className}`}>{children}</h1>;
        case "h2":
            return <h2 className={`text-2xl  ${className}`}>{children}</h2>;
        case "h3":
            return <h3 className={`text-xl  ${className}`}>{children}</h3>;
        case "h4":
            return <h4 className={`text-lg  ${className}`}>{children}</h4>;
        case "h5":
            return <h5 className={`text-base  ${className}`}>{children}</h5>;
        case "h6":
            return <h6 className={`text-sm  ${className}`}>{children}</h6>;
    }
}
