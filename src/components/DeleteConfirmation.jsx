import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Heading from '@/UI-Global/Heading';
import { TriangleAlert } from 'lucide-react';

export function DeleteConfirmation({ open, setOpen, onDelete }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[30rem] rounded-2xl pt-12">
        <AlertDialogHeader className={'items-center'}>
          <TriangleAlert className="box-content h-12 w-16 rounded-full bg-red-500/10 px-4 py-6 text-red-700" />
          <Heading as={'h2'} className="py-4 font-almaria-extrabold">
            تأكيد الحذف {' '}
          </Heading>
          <div className="space-y-3 text-center font-almaria text-accent-l-700">
            <p>ستؤدي هذه العملية الي ازالة جميع البيانات المتعلقة بها نهائيا</p>
            <p>هل انت متأكد؟</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className={'mx-auto mt-4 flex items-center justify-center gap-4'}>
          <AlertDialogAction
            className="rounded-3xl px-12 py-6"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            نعم, حذف!
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => setOpen(false)} className="rounded-3xl px-12 py-6">
            لا, الغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
