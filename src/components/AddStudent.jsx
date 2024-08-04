import Heading from "./ui/Heading.jsx";
import FormInput from "./ui/FormInput.jsx";
import profile from '../../public/imgs/profile.svg';
import DropList from "./ui/DropList.jsx";
import Button from "./ui/Button.jsx";

function AddStudent() {
    return (
        <>
            <Heading as={"h1"} className={"text-center"}>بيانات الطالب</Heading>
            <div className={"flex gap-10 flex-col mt-10 font-cairo-bold"}>
                <Heading as={"h4"}>الاسم الرباعي</Heading>
                <FormInput type={"text"} name={"name"} className={"w-11/12"} icon={profile}
                           divClassName={'bg-white w-3/4 justify-around'}/>
                <div className={"grid grid-cols-3"}>
                    <div className={"flex flex-col gap-5"}>
                        <Heading as={"h4"}>المرحلة الدراسية</Heading>
                        <DropList title={"اختر المرحلة الدراسية"} options={["الابتدائيه", "الاعداديه", "الثانويه"]}/>
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <Heading as={"h4"}>الصف الدراسي</Heading>
                        <DropList title={"اختر المرحلة الدراسية"} options={["الابتدائيه", "الاعداديه", "الثانويه"]}/>
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <Heading as={"h4"}>المجموعة</Heading>
                        <DropList title={"اختر المجموعة"} options={["الابتدائيه", "الاعداديه", "الثانويه"]}/>
                    </div>
                </div>
                <Button type={"outline"} className={"w-1/4 mt-40 self-center"}>اضافة</Button>
            </div>
        </>
    );
}

export default AddStudent;