import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Warn from '/public/Icons/warining.svg';

function RemoveGroupAlert({ group = true, student = false, title, description, children, handleDelete }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent className={'!min-h-[10vh] w-[450px] max-w-full rounded-xl'}>
          <AlertDialogHeader className={'!text-right'}>
            <AlertDialogTitle className="my-4 text-center text-3xl font-extrabold">
              <p className="relative mb-4 flex justify-center">
                <Warn />
              </p>
              <span>{title || 'تأكيد حذف المجموعة'}</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg"> {description || 'ستؤدي هذه العملية إلى إزالة جميع البيانات المتعلقة بالمجموعة نهائيًا. هل أنت متأكد؟'} </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={'mt-4 !justify-between gap-4'}>
            <AlertDialogAction className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }} onClick={handleDelete}>
              نعم، حذف!
            </AlertDialogAction>
            <AlertDialogCancel className="p-5" style={{ width: '100%', padding: '10px', borderRadius: '20px' }}>
              لا، إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default RemoveGroupAlert;
