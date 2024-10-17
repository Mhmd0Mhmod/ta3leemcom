import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// const groups = [
//   {
//     value: 'next.js',
//     label: 'Next.js',
//   },
//   {
//     value: 'sveltekit',
//     label: 'SvelteKit',
//   },
//   {
//     value: 'nuxt.js',
//     label: 'Nuxt.js',
//   },
//   {
//     value: 'remix',
//     label: 'Remix',
//   },
//   {
//     value: 'astro',
//     label: 'Astro',
//   },
// ];

export function Combobox({ allGroups, selectedGroups, setSelectedGroups }) {
  const groups = allGroups?.length > 0 ? allGroups?.map((group) => ({ value: group?.groupName, label: group?.groupName, id: group?.groupId })) : [];
  const selected = selectedGroups?.length > 0 ? selectedGroups?.map((group) => ({ value: group?.groupName, label: group?.groupName, id: group?.groupId })) : [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[250px] justify-between">
          {/* {value ? groups.find((group) => group.value === value)?.label : 'اضافة مجموعة...'} */}
          {'اضافة مجموعة...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[250px] w-[250px] p-0">
        {selected?.length > 0 && (
          <div className="flex flex-wrap gap-2 px-1 py-2">
            {selected?.map((item) => (
              <Badge variant={'secondary'} key={item.value} className="mb-2 gap-1 rounded-lg text-lg">
                <Button
                  size="icon"
                  variant="ghost"
                  className="m-0 h-fit w-fit p-0"
                  onClick={() => {
                    setSelectedGroups((prev) => prev.filter((group) => group.groupName !== item.value));
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                {item.label}
              </Badge>
            ))}
          </div>
        )}
        <hr />

        <Command>
          <CommandInput placeholder=" بحث عن مجموعة..." />
          <CommandList>
            <CommandEmpty>لا يوجد مجموعات.</CommandEmpty>
            <CommandGroup>
              {groups?.map((group, index) => (
                <CommandItem
                  // key={group.value}
                  key={index}
                  value={group.value}
                  className={selectedGroups?.find((item) => item.groupName === group.value) && 'mb-1 bg-slate-100'}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? '' : currentValue);
                    setSelectedGroups((prev) => {
                      if (!prev.find((group) => group.groupName === currentValue)) {
                        // console.log(
                        // 'first',
                        // allGroups.find((grp) => grp.groupId === group.id),
                        // currentValue,
                        // group.value,
                        // allGroups,
                        // groups,
                        // );
                        return [...prev, { groupId: allGroups.find((grp) => grp.groupId === group.id)?.groupId, groupName: currentValue }];
                      }
                      return prev;
                    });
                  }}
                >
                  {group.label}
                  <Check className={cn('mr-auto h-4 w-4', selectedGroups?.find((item) => item.groupName === group.value) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
