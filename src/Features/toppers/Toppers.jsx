import { useSearchParams } from 'react-router-dom';
import { FakeGroups } from '../../config.js';
import Confetti from 'react-confetti';
import HeadingLevelsPages from '../../UI-Global/HeadingLevelsPages.jsx';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import PropTypes from 'prop-types';

Toppers.propTypes = {
  groupsId: PropTypes.arrayOf(PropTypes.number),
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  backToLevels: PropTypes.bool,
};

function Toppers({ groupsId = [], students = [], backToLevels = true }) {
  const [animation, setAnimation] = useState(true);
  const toppers = students?.filter((el) => groupsId.includes(el.groupId));
  const style = {
    0: {
      text: '!bg-[#8F2222] text-white',
      number: 'bg-gradient-to-r from-[#FFD700] to-[#FF6A00] text-white !border-[#8F2222]',
    },
    1: {
      text: '!bg-[#616E7C] text-white',
      number: '!bg-[#869DB5] text-white !border-[#616E7C]',
    },
    2: {
      text: '!bg-[#EE943C] text-white',
      number: '!bg-[#B46300] text-white !border-[#EE943C]',
    },
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Confetti height={useWindowSize().height} numberOfPieces={2000} tweenDuration={5000} recycle={animation} />
      <div className={'m-auto flex w-[687px] flex-col gap-6 text-center'}>
        <HeadingLevelsPages title={'المتفوقون'} backToLevels={backToLevels} />
      </div>
      <div className={'m-auto flex w-[559px] flex-col font-almaria-bold'}>
        {toppers?.map((el, index) => (
          <div className={`relative flex items-center rounded`} key={el.id}>
            <div className={`relative`}>
              <div className={'rounded-full border-4 border-[#F5F7F9]'}>
                <span className={`bg flex h-10 w-10 items-center justify-center rounded-full border-8 border-[#C6C6C6] bg-white p-7 text-xl ${style[index]?.number}`}>{index + 1}</span>
              </div>
            </div>
            <h3 className={`-mr-5 w-full rounded-[11px] bg-[#C6C6C6] p-4 text-center text-xl ${style[index]?.text}`}>{el.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Toppers;
