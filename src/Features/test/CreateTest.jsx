import { DeleteConfirmation } from '@/components/DeleteConfirmation';
import Backtolevels from '@/UI-Global/Backtolevels';
import Breadcrumb from '@/UI-Global/Breadcrumb';
import Heading from '@/UI-Global/Heading';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddOnlineTest from './AddOnlineTest';
import AddOfflineTest from './AddOfflineTest';
import CreateOnlineTest from './CreateOnlineTest';

function CreateTest({ type = 'online' }) {
  const { groupId } = useParams();
  return (
    <div className="px-12 py-16">
      <Backtolevels />
      <Heading as={'h1'} className={'my-6 font-almaria-bold text-black'}>
        اختبار جديد
      </Heading>
      <Breadcrumb />
      <hr className="w-[70%]" />
      {type === 'online' ? <CreateOnlineTest /> : <AddOfflineTest />}
    </div>
  );
}
export default CreateTest;
