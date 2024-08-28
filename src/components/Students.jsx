import { useSearchParams } from "react-router-dom";
import { constraints, FakeGroups } from "../config.js";
import Heading from "./ui/Heading.jsx";
import Button from "./ui/Button.jsx";
import { useEffect, useState } from "react";
import Table from "./ui/Table/Table.jsx";
import THead from "./ui/Table/THead.jsx";
import TR from "./ui/Table/TR.jsx";
import TH from "./ui/Table/TH.jsx";
import TBody from "./ui/Table/TBody.jsx";
import TD from "./ui/Table/TD.jsx";
import sort from "/public/Icons/sort.svg";
import edit from "/public/Icons/edit_icon.svg";
import trash from "/public/Icons/trash_icon.svg";
import Icon from "./ui/Icon.jsx";

function Students() {
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level");
    const subLevel = searchParams.get("subLevel");
    const groups = searchParams.get("group").split("_");
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc");

    const backToLevel = () => {
        setSearchParams({ tab: "level", level });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search) {
            setStudents(
                FakeGroups.filter((el) => groups.includes(el.name))
                    .map((el) => el.students)
                    .flat()
                    .filter((el) => el.name.includes(search))
            );
            return;
        }
        setStudents(
            FakeGroups.filter((el) => groups.includes(el.name))
                .map((el) => el.students)
                .flat()
        );
    }, [search]);

    const handleSort = () => {
        const sortedStudents = [...students].sort((a, b) => {
            if (sortDirection === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setStudents(sortedStudents);
    };

    return (
        <div className={"flex flex-col gap-6"}>
            <button className="flex gap-1" onClick={backToLevel}>
                <img src="Icons/rev_arrow.svg" alt="" />
                <Heading as={"h3"} className={"text-secondary underline font-almaria-bold"}>
                    العوده الي المراحل الدراسية
                </Heading>
            </button>
            <Heading as={"h1"} className={"font-almaria-bold"}>الطلاب</Heading>
            <hr className="w-[70%]" />
            <div className="flex gap-2 mb-12 font-almaria-light">
                <button className="flex gap-1" onClick={() => setSearchParams({ tab: "level" })}>
                    <span>المراحل الدراسية</span>
                    <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
                </button>
                <button className="flex gap-1" onClick={() => setSearchParams({ tab: "level", level: searchParams.get("level") })}>
                    <span>{constraints[searchParams.get("level")].text}</span>
                    <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
                </button>
                <button className="flex gap-1">
                    <span>{constraints[level].content[+subLevel]}</span>
                    <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
                </button>
                <button className="flex gap-1">
                    <span>{groups.join(" / ")}</span>
                    <img src="Icons/breadcrumb_arrow.svg" alt="arrow" />
                </button>
                <div className="flex gap-1 font-almaria-bold">
                    <span>الطلاب </span>
                </div>
            </div>
            <div className={"flex justify-between items-center"}>
                <div className={"flex gap-4"}>
                    <div className="flex gap-5 bg-white p-3 w-[30rem] border-2 rounded-lg ">
                        <img src="Icons/search_icon.svg" alt="search" />
                        <input
                            type="text"
                            placeholder="اسم الطالب"
                            className="w-full"
                            value={search}
                            onChange={handleSearch}
                        />
                        {search && <img src="Icons/removeSeach.svg" alt="search" />}
                    </div>
                    <Button type="Secondary" className={" bg-accent-900 !text-black h- font-almaria text-xl  "}>
                        بحث
                    </Button>
                </div>
                <div>
          <span className={"px-6 py-4 bg-accent-900 !text-black h- font-almaria text-xl rounded "}>
            عدد الطلاب :
            <span className={"font-almaria-bold"}>{" " + students.length}</span>
          </span>
                </div>
            </div>
            <Table className={"!w-1/2 "}>
                <THead>
                    <TR className={"p-2 bg-[#A8A8A833] rounded cursor-pointer "}>
                        <TH className={"flex justify-center gap-4 items-center"} onClick={handleSort}>
                            <span>اسم الطالب</span>
                            <img src={sort} />
                        </TH>
                    </TR>
                </THead>
                <TBody className={"mt-2 h-[380px] overflow-auto"}>
                    {students?.map((el, i) => {
                        return (
                            <TR key={el.id}>
                                <TD>
                                    <div className={"flex gap-4 p-2 bg-white border-b-4 items-center rounded"}>
                                        <Icon src={edit} alt={"edit"} className={"!w-5"} />
                                        <span>{i + 1}.{el.name}</span>
                                        <Icon src={trash} alt={"delete"} className={"mr-auto !w-5"} />
                                    </div>
                                </TD>
                            </TR>
                        );
                    })}
                </TBody>
            </Table>
        </div>
    );
}

export default Students;