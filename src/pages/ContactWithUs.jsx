import Button from "../components/ui/Button.jsx";

export default function ContactWithUs() {
    return (
        <div className={"flex flex-col justify-evenly gap-32"}>
            <h1 className={"font-almaria-bold text-4xl text-center"}>تواصل معنا</h1>
            <p className={"font-almaria-bold text-2xl text-cyan-600"}>نحن هنا للمساعدة، تواصل معنا</p>
            <div className={"grid grid-cols-2 justify-items-center"}>

                <div className={"flex flex-col gap-5 w-full"}>
                    <div className={"flex gap-5"}>

                        <label className={"flex flex-col w-full gap-2 font-almaria-bold"}>
                            الاسم
                            <input type="text" className={"border-2 border-blue-200 bg-blue-100 p-2 rounded-md"}/>
                        </label>
                        <label className={"flex flex-col gap-2 w-full font-almaria-bold"}>
                            البريد الالكتروني
                            <input type="email" className={"border-2 border-blue-200 bg-blue-100 p-2 rounded-md"}/>
                        </label>
                    </div>
                    <label className={"flex flex-col gap-2 font-almaria-bold"}>
                        الموضوع
                        <input type="text" className={"border-2 border-blue-200 bg-blue-100 p-2 rounded-md"}/>
                    </label>
                    <label className={"flex flex-col gap-2 font-almaria-bold"}>
                        الرسالة
                        <textarea className={"border-2 border-blue-200 bg-blue-100 p-2 rounded-md"}/>
                    </label>
                    <div className={"self-center"}>
                        <Button type={"primary"} icon={<img src="../../public/imgs/sendmessaage.png" />}
                                className={"justify-center flex-row-reverse items-center"}> إرسال الرسالة </Button>
                    </div>
                </div>
                <div>
                    <img src="../../public/imgs/contactusphoto.svg"/>
                </div>
            </div>
        </div>
    )
}
