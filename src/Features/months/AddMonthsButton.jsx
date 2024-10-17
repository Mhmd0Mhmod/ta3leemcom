import Button from '../../UI-Global/Button.jsx';
import Plus from '/public/Icons/plus.svg';
import { useEffect, useState } from 'react';
import { MonthsInArabic } from '../../config.js';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddMonthsButton({ existMonths, selectedGroup, setMonthsUpdate, setAlertData, onClick = () => {} }) {
  const currentYear = new Date().getFullYear();
  const availableMonths = MonthsInArabic.filter((month) => !existMonths.find((existMonth) => existMonth.monthName === month && existMonth.year === currentYear));
  const [monthSearch, setMonthSearch] = useState('');
  const [months, setMonths] = useState([]);
  const [openSelectMonths, setOpenSelectMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();

  useEffect(() => {
    setMonths(availableMonths);
  }, [existMonths]);

  const addMonth = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/Month`,
        {
          name: selectedMonth,
          year: currentYear,
          groupId: selectedGroup,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('_auth')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setMonthsUpdate((prev) => [...prev, { groupId: data.groupId, monthId: data.id, monthName: data.name, year: data.year }]);
      setAlertData({
        title: 'تم اضافه الشهر بنجاح',
        type: 'success',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } catch (error) {
      setAlertData({
        title: 'حدث خطأ ما',
        type: 'error',
        open: true,
        setOpen: () => setAlertData((prev) => ({ ...prev, open: false })),
      });
    } finally {
      setOpenSelectMonths(false);
      setSelectedMonth(null);
    }
  };

  function searchMonths(monthSearch) {
    if (monthSearch === '') {
      setMonths(availableMonths);
    } else {
      setMonths(availableMonths.filter((month) => month.includes(monthSearch)));
    }
  }

  return (
    <div className={'relative'}>
      <div>
        <Button
          type="Secondary"
          className="flex gap-4 bg-secondary-l p-6 text-2xl"
          onClick={() => {
            setOpenSelectMonths(!openSelectMonths);
            onClick();
          }}
        >
          <Plus />
          <span>اضافة شهر</span>
        </Button>
        {openSelectMonths && (
          <div className={'absolute right-0 top-full z-20 flex w-fit flex-col gap-6 rounded bg-white p-5 text-xl'}>
            <input
              type={'text'}
              placeholder={'ابحث عن شهر'}
              className={'rounded border p-2 text-black'}
              value={monthSearch}
              onChange={(e) => {
                setMonthSearch(e.target.value);
                searchMonths(e.target.value);
              }}
            />
            <ul className={'max-h-[218px] overflow-auto text-right'}>
              {months.map((month, index) => (
                <li key={index} className={'flex gap-4 rounded border-b p-2 text-black duration-500 hover:bg-[#B4D3E0]'}>
                  <input type={'radio'} name={'months'} value={month} id={month} className={'w-[22px]'} onChange={() => setSelectedMonth(month)} />
                  <label htmlFor={month}>{month}</label>
                </li>
              ))}
            </ul>
            <div className={'flex gap-4'}>
              <Button
                type={'normal'}
                className={'!border-[#D9D9D9] !text-black'}
                onClick={() => {
                  setOpenSelectMonths(!openSelectMonths);
                  setSelectedMonth(null);
                }}
              >
                الغاء
              </Button>
              <Button type={'Secondary'} className={'bg-secondary-l disabled:opacity-60'} disabled={!selectedMonth || !selectedGroup} onClick={addMonth}>
                إضافة
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMonthsButton;
