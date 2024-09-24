import Backtolevels from "./Backtolevels.jsx";
import Heading from "./Heading.jsx";
import Breadcrumb from "./Breadcrumb.jsx";

function HeadingLevelsPages({title, backToLevels = true}) {
    return (
        <>
            {backToLevels && <Backtolevels/>}
            <Heading as={"h1"} className={"font-almaria-bold"}>{title}</Heading>
            <hr className="w-[70%]"/>
            <Breadcrumb page={title}/>
        </>
    );
}

export default HeadingLevelsPages;