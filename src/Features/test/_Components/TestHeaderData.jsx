import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';

import { Button } from '/src/components/ui/button.jsx';
import OnlineIcon from '/public/Icons/online_icon.svg';
import TimeIcon from '/public/Icons/time_icon.svg';
import TimeIcon2 from '/public/Icons/time_icon_2.svg';
import CalenderIcon from '/public/Icons/calender_icon_2.svg';
import CopyIcon from '/public/Icons/copy_icon_gray.svg';
import TrashIcon from '/public/Icons/trash_icon_gray.svg';
import TestImage from '/public/imgs/test_image.svg';
import { PopoverClose } from '@radix-ui/react-popover';
import { SolidLogo } from '/src/UI-Global/SolidLogo.jsx';

import { Input } from '@/components/ui/input.jsx';

function TestHeaderData() {
  const [title, setTitle] = useState('');
  function setAsOfflineTest() {
    console.log('setAsOfflineTest');
  }
  function setShowTestDeletion() {
    console.log('setShowTestDeletion');
  }

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-6 flex items-center justify-between">
        <SolidLogo />
        <div className="flex gap-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={() => {}} variant="outline" size="icon">
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" sideOffset={10}>
                <p>انشاء نسخة</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" onClick={setShowTestDeletion}>
                  <TrashIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" sideOffset={10}>
                <p>حذف</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="my-4 flex">
        <div className="mr-8">
          <TestImage />{' '}
        </div>
        <div className="ml-8 flex-grow">
          <div className="mr-6 flex flex-grow items-center gap-3">
            <div className="flex-grow">
              {/* <Heading as={'h3'} className={'mb-12 font-almaria-bold'}>
            </Heading> */}
              <Input className="mb-10 max-w-56 border-none" placeholder="عنوان الاختبار" value={title} onChange={(e) => setTitle(e.target.value)} />
              <div className="grid max-w-[500px] grid-cols-3 gap-4">
                {/* {tabs_1.map((item, index) => (
                  <Tab key={index} type={'ghost'} text={item.text} path={item.path} />
                ))} */}
              </div>
            </div>
            <div className="my-auto flex flex-col gap-3">
              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
                          <OnlineIcon />
                          <span>اونلاين</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" sideOffset={10}>
                        <p>نوع الاختبار</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent side={'right'} align="start" alignOffset={10} sideOffset={10} className="m-0 w-fit rounded-lg border-0 p-0 shadow-none">
                  <Button variant="outline" className="pl-10" onClick={setAsOfflineTest}>
                    اوفلاين
                  </Button>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
                          <TimeIcon />
                          <span className="ltr">{/* {timeStartString.hour}:{timeStartString.minute} {timeStart.mode} */}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" sideOffset={10}>
                        <p>يبدا الاختبار</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="w-[96]">{/* <PickTime PopoverClose={PopoverClose} timeStartString={timeStartString} timeStart={timeStart} setTimeStart={setTimeStart} MINS={MINS} HOURS={HOURS} /> */}</PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
                          <TimeIcon2 />
                          {/* <span>{timeDurationString.duration}</span> */}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" sideOffset={10}>
                        <p>مدة الاختبار</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="w-[96]">{/* <PickDuration PopoverClose={PopoverClose} timeDurationString={timeDurationString} timeDuration={timeDuration} setTimeDuration={setTimeDuration} MINS={MINS} HOURS={HOURS} /> */}</PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <Button variant="secondary" className="w-full justify-start gap-2 pr-1">
                          <CalenderIcon />
                          {/* <span>{date?.toLocaleDateString()}</span> */}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" sideOffset={10}>
                        <p>تاريخ الاختبار</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="ltr p-0">
                  <Calendar
                    mode="single"
                    // selected={date}
                    // onSelect={setDate}
                    className="rounded-md border"
                    footer={
                      <PopoverClose className="mt-2 w-full">
                        <Button variant="outline" className="w-full">
                          حفظ
                        </Button>
                      </PopoverClose>
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-4">
            <div className="flex gap-6"></div>
            {/* {!timePassed && (
              <div className="flex gap-6">
                <Combobox allGroups={groupsOfSelectedlevel} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />
                <Button variant={'outline'} onClick={() => handelSaveQuiz(false)} className="gap-2">
                  {test ? 'تعديل' : 'اضافة'}
                  {test ? <Edit className="text-slate-600" /> : <ShareIcon />}
                </Button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TestHeaderData;
