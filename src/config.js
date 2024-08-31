export const MonthsInArabic = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];


export const LEVELS = {
    levels: ["المرحلة الابتدائية", "المرحلة الاعدادية", "المرحلة الثانوية"],
    primary: ["الصف الاول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"],
    middle: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
    high: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
};

export const FakeStudent = [
    {
        code: 1,
        name: "ابراهيم محمد مشرف محمد",
        mainLevel: LEVELS.levels[0],
        subLevel: LEVELS.primary[0],
        group: "مجموعه 1",
    },
    {
        code: 2,
        name: "ابراهيم محمد مشرف محمد",
        mainLevel: LEVELS.levels[0],
        subLevel: LEVELS.primary[0],
        group: "مجموعه 1",
    },
    {
        code: 3,
        name: "ابراهيم محمد مشرف محمد",
        mainLevel: LEVELS.levels[0],
        subLevel: LEVELS.primary[0],
        group: "مجموعه 1",
    },
    {
        code: 4,
        name: "ابراهيم محمد مشرف محمد",
        mainLevel: LEVELS.levels[0],
        subLevel: LEVELS.primary[0],
        group: "مجموعه 1",
    },
];
export const FakeGroups = [
    {
        id: 1,
        name: "المجموعة الاولى",
        students: Array.from({length: 20}, (_, i) => ({
            id: i + 1,
            name: `الطالب  ${i + 1}`,
            phone: "01000000000",
            email: "",
            level: "الصف الاول",
            subLevel: 0,
            group: "المجموعة الاولى",
            status: "active",
        })),
    },
    {
        id: 2,
        name: "المجموعة الثانية",
        students: Array.from({length: 20}, (_, i) => ({
            id: i + 21,
            name: `الطالب  ${i + 21}`,
            phone: "01000000000",
            email: "",
            level: "الصف الثاني",
            subLevel: 1,
            group: "المجموعة الثانية",
            status: "active",
        })),
    },
    {
        id: 3,
        name: "المجموعة الثالثة",
        students: Array.from({length: 20}, (_, i) => ({
            id: i + 41,
            name: `الطالب  ${i + 41}`,
            phone: "01000000000",
            email: "",
            level: "الصف الثالث",
            subLevel: 2,
            group: "المجموعة الثالثة",
            status: "active",
        })),
    },
    {
        id: 4,
        name: "المجموعة الرابعة",
        students: Array.from({length: 20}, (_, i) => ({
            id: i + 61,
            name: `الطالب  ${i + 61}`,
            phone: "01000000000",
            email: "",
            level: "الصف الرابع",
            subLevel: 3,
            group: "المجموعة الرابعة",
            status: "active",
        })),
    },
    {
        id: 5,
        name: "المجموعة الخامسة",
        students: Array.from({length: 20}, (_, i) => ({
            id: i + 81,
            name: `الطالب  ${i + 81}`,
            phone: "01000000000",
            email: "",
            level: "الصف الخامس",
            subLevel: 4,
            group: "المجموعة الخامسة",
            status: "active",
        })),
    },
];
export const constraints = {
    primary: {
        text: "المرحلة الابتدائية",
        content: ["الصف الاول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"],
    },
    middle: {
        text: "المرحلة الاعدادية",
        content: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
    },
    high: {
        text: "المرحلة الثانوية",
        content: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
    },
};

