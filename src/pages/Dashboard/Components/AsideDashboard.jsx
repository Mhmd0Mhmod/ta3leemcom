import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';

function AsideDashboard({ tabs, opened, className }) {
  const location = useLocation();
  const activeTab = location.pathname.split('/').at(-1);

  return (
    <ul className={`mt-2 flex flex-col gap-2 font-cairo text-xl ${className}`}>
      {tabs?.map((tab, idx) => (
        <Fragment key={idx + tabs.length}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                {tab.Details ? (
                  <>{tab.Details}</>
                ) : (
                  <li>
                    <Link to={`/dashboard/${tab.tab}`} className={`flex cursor-pointer items-center gap-[18px] rounded p-2.5 duration-300 hover:bg-[#b4d3e0] ${activeTab === tab.tab ? 'active' : ''}`}>
                      {console.log(tab.tab === activeTab)}
                      <tab.icon className={`${!opened ? 'm-auto' : ''}`} />
                      <span className={`${!opened ? 'hidden' : ''}`}>{tab.name}</span>
                    </Link>
                  </li>
                )}
              </TooltipTrigger>
              {!opened && <TooltipContent side={'left'}>{tab.name}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </Fragment>
      ))}
    </ul>
  );
}

AsideDashboard.propTypes = {
  tabs: PropTypes.array.isRequired,
  opened: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default AsideDashboard;
