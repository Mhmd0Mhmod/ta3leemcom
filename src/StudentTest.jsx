import Heading from "@/components/ui-local/Heading.jsx";
import HeadIcon from "../public/Icons/head-icon-student.svg";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import Question from "../public/Icons/question_icon.svg"
import Bouns from "../public/Icons/bouns_icon.svg"
import Point from "../public/Icons/flag_icon.svg"
import Search from "../public/Icons/search_icon.svg";
import RemoveSearched from "../public/Icons/removeSeach.svg";
import Table from "@/components/ui-local/Table/Table.jsx";

function StudentTest() {
    const [tests, setTests] = useState([
        {id: 1, name: "اختبار الرياضيات", date: "2023-10-01"},
        {id: 2, name: "اختبار العلوم", date: "2023-10-05"},
        {id: 3, name: "اختبار التاريخ", date: "2023-10-10"}
    ]);
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div>
            <div className={"flex items-center"}>
                <Heading as={"h3"} className={"font-almaria-bold "}>الاختبارات الحالية </Heading>
                <HeadIcon/>
            </div>
            <div className={"flex flex-col gap-16 mr-10 mt-10 h-[30rem] overflow-y-auto"}>
                {tests.map((test, idx) => (
                        <div key={test.id} className={"flex items-center gap-4"}>
                            <span className={"text-l font-almaria-bold"}>
                                {idx + 1}.
                            </span>
                            <div
                                className={" w-[90%] grid  grid-cols-2 justify-between py-10  px-5 rounded bg-white"}>
                                <div className={"w-[70%] flex flex-col justify-between"}>
                                    <div className={"flex items-center justify-between"}>
                                        <span className={"font-almaria-bold"}>{test.name}</span>
                                        <Button className={"bg-[#0884A2] hover:bg-[#0884A2]"}>
                                            بدا الاختبار
                                        </Button>
                                    </div>
                                    <div className={"flex justify-between "}>
                                        <div className={"flex gap-2 text-[#878787]"}>
                                            <Question/>
                                            <span>{1}</span>
                                            <span>سؤال</span>
                                        </div>
                                        <div className={"flex gap-2 text-[#878787]"}>
                                            <Bouns/>
                                            <span>{1}</span>
                                            <span>بونص</span>
                                        </div>
                                        <div className={"flex gap-2 text-[#878787]"}>
                                            <Point/>
                                            <span>{1}</span>
                                            <span>درجة</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col mr-auto gap-2 font-almaria-bold"}>
                                    <div className={"flex items-center gap-10"}>
                                        <span>تاريخ الاختبار</span>
                                        <span className={"bg-[#EFEFEF] py-2 px-4 rounded"}>{test.date}</span>
                                    </div>
                                    <div className={"flex items-center gap-10"}>
                                        <span>وقت الاخبار</span>
                                        <span className={"bg-[#EFEFEF] py-2 px-4 rounded"}>{test.date}</span>
                                    </div>
                                    <div className={"flex items-center gap-10"}>
                                        <span>مدة الاختبار</span>
                                        <span className={"bg-[#EFEFEF] py-2 px-4 rounded"}>{test.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <hr className={"w-11/12 my-8 "}/>
            <div>

                <div className={"flex items-center mb-8"}>
                    <Heading as={"h3"} className={"font-almaria-bold "}>الاختبارات المنتهية </Heading>
                    <HeadIcon/>
                </div>
                <div>
                    <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 rounded-lg ">
                        <Search/>
                        <input
                            type="text"
                            placeholder="اسم الاختبار"
                            className="w-full"
                            value={search}
                            onChange={handleSearch}
                        />
                        {search && <RemoveSearched/>}
                        <Table></Table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StudentTest;