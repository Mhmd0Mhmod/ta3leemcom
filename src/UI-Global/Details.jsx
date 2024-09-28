import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Details.propTypes = {
  className: PropTypes.string,
  summary: PropTypes.string,
  Icon: PropTypes.elementType,
  listIcon: PropTypes.bool,
  listItems: PropTypes.array,
  tabName: PropTypes.array,
  param: PropTypes.string,
  opend: PropTypes.bool,
  children: PropTypes.element,
};

function Details({ className, summary, route, Icon, listIcon = true, listItems = [], tabName = [], param, opend, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get(param);
  const [showList, setShowList] = useState(false);
  const loaction = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setShowList(false);
  }, [opend, activeTab]);

  function handleOpen(e) {
    if (!opend) {
      e.preventDefault();
      setShowList((prev) => !prev);
    }
  }
  function handleTo(tab) {
    if (loaction.pathname.includes(route)) {
      setSearchParams({ [param]: tab });
    } else navigate(`${route}?${param}=${tab}`);
  }

  return (
    <div className="relative">
      <details open={opend ? '' : false} onClick={handleOpen}>
        <summary className={'mb-2 flex cursor-pointer items-center gap-[18px] rounded p-2.5 duration-300 hover:bg-[#b4d3e0] ' + className}>
          <Icon className={`${!opend ? 'm-auto' : ''}`} />
          <span className={`${!opend ? 'hidden' : ''}`}>{summary}</span>
        </summary>
        {!showList && (
          <ul className={'flex flex-col gap-2'}>
            {listItems.map((item, index) => (
              <li onClick={() => handleTo(tabName[index])} key={tabName[index]} className={`flex cursor-pointer items-center gap-2 rounded p-2.5 pr-7 text-[#757474] duration-300 hover:bg-[#b4d3e0] ${activeTab === tabName[index] ? 'active' : ''}`}>
                {listIcon && <span className={'inline-block h-1 w-1 bg-[#757474]'}></span>}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </details>
      {showList && (
        <ul className={'absolute -left-[120px] top-0 z-10 w-[110px] rounded-[7px] bg-white text-[14px] shadow-lg'}>
          {listItems.map((item, index) => (
            <li
              onClick={() => {
                setSearchParams({ tab: param, [param]: tabName[index] });
                setShowList(false);
              }}
              key={tabName[index]}
              className={`cursor-pointer rounded p-1 pl-4 duration-300 hover:bg-[#D7D7D7] ${activeTab === tabName[index] ? 'active' : ''}`}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Details;
