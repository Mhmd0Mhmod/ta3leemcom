export const MonthsInArabic = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

export const LEVELS = {
  levels: ['المرحلة الابتدائية', 'المرحلة الاعدادية', 'المرحلة الثانوية'],
  primary: ['الصف الاول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس'],
  middle: ['الصف الاول', 'الصف الثاني', 'الصف الثالث'],
  high: ['الصف الاول', 'الصف الثاني', 'الصف الثالث'],
};
export const Teacher = {
  id: 1,
  name: 'ابراهيم محمد مشرف',
  phone: '01000000000',
  email: 'mohamed@example.com',
  level: 'المرحلة الابتدائية',
  subLevel: 'الصف الاول',
  group: 'مجموعه 1',
  status: 'active',
  login: true,
};
export const Student = {
  id: 1,
  name: 'محمد أحمد',
  phone: '01000000000',
  email: '',
  level: 'المرحلة الابتدائية',
  subLevel: 'الصف الاول',
  groupId: 1,

  status: 'active',
};

export const FakeStudent = [
  {
    code: 1,
    name: 'ابراهيم محمد مشرف محمد',
    mainLevel: LEVELS.levels[0],
    subLevel: LEVELS.primary[0],
    group: 'مجموعه 1',
    paid: Math.random() > 0.5, // Randomly assign paid value
  },
  {
    code: 2,
    name: 'ابراهيم محمد مشرف محمد',
    mainLevel: LEVELS.levels[0],
    subLevel: LEVELS.primary[0],
    group: 'مجموعه 2',
    paid: Math.random() > 0.5, // Randomly assign paid value
  },
  {
    code: 3,
    name: 'ابراهيم محمد مشرف محمد',
    mainLevel: LEVELS.levels[0],
    subLevel: LEVELS.primary[0],
    group: 'مجموعه 1',
    paid: Math.random() > 0.5, // Randomly assign paid value
  },
  {
    code: 4,
    name: 'ابراهيم محمد مشرف محمد',
    mainLevel: LEVELS.levels[0],
    subLevel: LEVELS.primary[0],
    group: 'مجموعه 1',
    paid: Math.random() > 0.5, // Randomly assign paid value
  },
];
export const FakeGroups = [
  {
    id: 1,
    name: 'المجموعة الاولى',
    students: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `الطالب  ${i + 1}`,
      phone: '01000000000',
      email: '',
      level: 'الصف الاول',
      subLevel: 0,
      group: 'المجموعة الاولى',
      status: 'active',
      paid: Math.random() > 0.5, // Randomly assign paid value
    })),
  },
  {
    id: 2,
    name: 'المجموعة الثانية',
    students: Array.from({ length: 20 }, (_, i) => ({
      id: i + 21,
      name: `الطالب  ${i + 21}`,
      phone: '01000000000',
      email: '',
      level: 'الصف الثاني',
      subLevel: 1,
      group: 'المجموعة الثانية',
      status: 'active',
      paid: Math.random() > 0.5, // Randomly assign paid value
    })),
  },
  {
    id: 3,
    name: 'المجموعة الثالثة',
    students: Array.from({ length: 20 }, (_, i) => ({
      id: i + 41,
      name: `الطالب  ${i + 41}`,
      phone: '01000000000',
      email: '',
      level: 'الصف الثالث',
      subLevel: 2,
      group: 'المجموعة الثالثة',
      status: 'active',
      paid: Math.random() > 0.5, // Randomly assign paid value
    })),
  },
  {
    id: 4,
    name: 'المجموعة الرابعة',
    students: Array.from({ length: 20 }, (_, i) => ({
      id: i + 61,
      name: `الطالب  ${i + 61}`,
      phone: '01000000000',
      email: '',
      level: 'الصف الرابع',
      subLevel: 3,
      group: 'المجموعة الرابعة',
      status: 'active',
      paid: Math.random() > 0.5, // Randomly assign paid value
    })),
  },
  {
    id: 5,
    name: 'المجموعة الخامسة',
    students: Array.from({ length: 20 }, (_, i) => ({
      id: i + 81,
      name: `الطالب  ${i + 81}`,
      phone: '01000000000',
      email: '',
      level: 'الصف الخامس',
      subLevel: 4,
      group: 'المجموعة الخامسة',
      status: 'active',
      paid: Math.random() > 0.5, // Randomly assign paid value
    })),
  },
];
export const AllStudent = FakeGroups.reduce((acc, group) => acc.concat(group.students), []);
// const token = Cookies.get('_auth');
// const [levelsYearId , setLevelsYearsId] = useState(null)
// let data = []
// const levelsID=async ()=>{
//   const response = await axios.get(import.meta.env.VITE_API_URL + '/LevelYear' ,{
//     headers: {
//       Authorization: `Bearer ${token}`, // إضافة الـ token هنا
//     },
//   });
//   if (response.status === 200) {
//     // toast.success(response.data);
//     data = response.data
//     console.log(data)
//   }
//  }
//  levelsID()
export const constraints = {
  primary: {
    id: 1,
    text: 'المرحلة الابتدائية',
    content: ['الصف الاول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس'],
  },
  middle: {
    id: 2,
    text: 'المرحلة الاعدادية',
    content: ['الصف الاول', 'الصف الثاني', 'الصف الثالث'],
  },
  high: {
    id: 3,
    text: 'المرحلة الثانوية',
    content: ['الصف الاول', 'الصف الثاني', 'الصف الثالث'],
  },
};

// export const constraints = {
//   primary: {
//     text: "المرحلة الابتدائية",
//     content: [
//       "الصف الاول",
//       "الصف الثاني",
//       "الصف الثالث",
//       "الصف الرابع",
//       "الصف الخامس",
//       "الصف السادس",
//     ],
//   },
//   middle: {
//     text: "المرحلة الاعدادية",
//     content: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
//   },
//   high: {
//     text: "المرحلة الثانوية",
//     content: ["الصف الاول", "الصف الثاني", "الصف الثالث"],
//   },
// };
