import Tab from '@/pages/Dashboard/Components/Tab';
import Button from '@/UI-Global/Button';
import Heading from '@/UI-Global/Heading';
import Tooltip from '@/UI-Global/Tooltip';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

function OfflineTest() {
  return (
    <>
      <div className="mx-auto w-full p-4 md:w-[85%] lg:w-[70%]">
        <div className="rounded-lg bg-white p-4">
          <div className="mb-6 flex items-center justify-between">
            <SolidLogo />
            <div className="flex gap-2">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" size="icon">
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
                    <Button variant="outline" size="icon">
                      <TrashIcon />{' '}
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
              <img src="imgs/test_image.svg" alt="test" />
            </div>
            <div className="ml-8 flex-grow">
              <div className="mr-6 flex flex-grow items-center gap-3">
                <div className="flex-grow">
                  <Heading as={'h3'} className={'mb-12 font-almaria-bold'}>
                    {title}
                  </Heading>
                  <div className="grid max-w-[500px] grid-cols-3 gap-4">
                    {tabs_1.map((item) => (
                      <Tab key={item.text} type={'ghost'} text={item.text} path={item.path} />
                    ))}
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
                              <span>اوفلاين</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center" sideOffset={10}>
                            <p>نوع الاختبار</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </PopoverTrigger>
                    <PopoverContent side={'right'} align="start" alignOffset={10} sideOffset={10} className="m-0 w-fit rounded-lg border-0 p-0 shadow-none">
                      <Button variant="outline" className="pl-10" onClick={setAsOnlineTest}>
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
                              <CalenderIcon />
                              <span>{date?.toLocaleDateString()}</span>
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
                        selected={date}
                        onSelect={setDate}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OfflineTest;
