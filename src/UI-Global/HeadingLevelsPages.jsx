import Backtolevels from './Backtolevels.jsx';
import Heading from './Heading.jsx';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '@/components/ui/breadcrumb.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
import { useTeacherDashboard } from '@/Context/TeacherDashboard/TeacherProvider.jsx';

function HeadingLevelsPages({ title, backToLevels = true }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const { mainLevels, groupsOfSelectedlevel, fetchingDashboard } = useTeacherDashboard();
  const mainLevel = mainLevels.find((el) => el?.id == searchParam.get('level'));
  const groupsId = searchParam
    .get('group')
    .split('_')
    .sort((a, b) => a - b);
  const groups = groupsOfSelectedlevel.filter((group) => groupsId.includes(`${group.groupId}`));
  useEffect(() => {
    if (!mainLevels) fetchingDashboard();
  }, [mainLevels, fetchingDashboard]);
  return (
    <>
      {backToLevels && <Backtolevels />}
      <Heading as={'h1'} className={'font-almaria-bold'}>
        {title}
      </Heading>
      <hr className="w-[70%]" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>المرحل الدراسيه </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={'rotate-Y-180'} />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/dashboard/level?level=${searchParam.get('level')}&subLevel=${searchParam.get('subLevel')}`}> {mainLevel?.name} </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={'rotate-Y-180'} />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbLink>المجموعات </BreadcrumbLink>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {groups.map((group) => (
                  <DropdownMenuItem key={group.groupId}>{group.groupName}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <BreadcrumbSeparator className={'rotate-Y-180'} />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink className={'font-almaria-bold text-black'}> {title} </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

export default HeadingLevelsPages;
