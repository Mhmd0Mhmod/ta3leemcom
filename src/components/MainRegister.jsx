import Heading from "./ui/Heading.jsx";
import Button from "./ui/Button.jsx";
import circles from "../../public/Icons/circles.svg";

export default function MainRegister({rightHandeSide}) {
    return (
        <>
            <div
                className={"absolute w-full h-full top-0 left-0 bg-[rgb(0,0,0,0.4)] flex items-center justify-center font-cairo"}>
                {/* Right Form */}
                <div className={"grid grid-cols-2 bg-white  w-1/2 rounded-3xl"}>
                    {rightHandeSide}
                    {/*Left constant Content  */}
                    <div
                        className={"bg-sign-up&login w-full h-full bg-cover bg-center rounded-3xl flex justify-center items-center relative "}>
                        <div className={"flex flex-col text-white justify-around h-1/4 items-start  "}>
                            <Heading as={"h1"}>
                                تعليم كوم
                            </Heading>
                            <p>تجربة تعليمية ممتعة وسلسة لكافة مستخدمينا</p>
                            <Button type={"normal"}
                                    className={"w-fit text-white bg-blue-600 border-0 text-sm rounded-3xl"}>اعرف
                                المزيد</Button>
                        </div>
                        <div className={"w-96 absolute bottom-0 left-0"}>
                            <img src={circles} alt={"circles"} className={"w-full"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}
