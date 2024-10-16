import Heading from '../../UI-Global/Heading.jsx';
import Button from '../../UI-Global/Button.jsx';
import Testimonial from '../../UI-Global/Testimonial.jsx';
import Star1 from '/public/imgs/star-1.svg';
import Star2 from '/public/imgs/star-2.svg';
import Star3 from '/public/imgs/star-3.svg';
import Star4 from '/public/imgs/star-4.svg';
import Star5 from '/public/imgs/star-5.svg';
import FilledStar1 from '/public/imgs/filled-star-1.svg';
import FilledStar2 from '/public/imgs/filled-star-2.svg';
import FilledStar3 from '/public/imgs/filled-star-3.svg';
import FilledStar4 from '/public/imgs/filled-star-4.svg';
import FilledStar5 from '/public/imgs/filled-star-5.svg';

import { useState } from 'react';
import { sendOpinion } from './helpers.js';
import toast from 'react-hot-toast';

export default function Opinion() {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const handleSetRate = (e) => {
    setRate(e.target.closest('svg').dataset.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendOpinion(rate, comment).then((res) => {
      if (res.status === 200) {
        toast.success('تم ارسال رايك بنجاح');
        setRate(0);
        setComment('');
      } else {
        toast.error('حدث خطأ اثناء ارسال رايك');
      }
    });
  };
  return (
    <div className="text-center">
      <Heading as={'h5'} className={'text-secondary-l'}>
        ماذا يقول عملائنا
      </Heading>
      <Heading as={'h1'} className={'my-4 font-almaria-bold'}>
        ملاحظات المستخدمين
      </Heading>
      <div className="flex items-center gap-4">
        <Heading as={'h2'} className={'my-4 font-almaria-bold text-secondary-l'}>
          رايك يهمنا
        </Heading>
        <span>
          <img src="imgs/qout.svg" alt="" />
        </span>
      </div>
      <div className="my-4 grid grid-cols-12">
        <div className="col-span-5 mr-8 flex flex-col">
          <Heading as={'h2'} className={'text-start'}>
            ما رأيك في تجربتك معنا؟
          </Heading>
          <Heading as={'h2'} className={'mt-2 text-start text-accent-l-50'}>
            تقيمك
          </Heading>
          <form onSubmit={handleSubmit}>
            <div className="my-6 flex w-full items-center justify-center gap-4">
              {rate >= 1 ? <FilledStar1 data-value={1} onClick={handleSetRate} /> : <Star1 data-value={1} onClick={handleSetRate} />}
              {rate >= 2 ? <FilledStar2 data-value={2} onClick={handleSetRate} /> : <Star2 data-value={2} onClick={handleSetRate} />}
              {rate >= 3 ? <FilledStar3 data-value={3} onClick={handleSetRate} /> : <Star3 data-value={3} onClick={handleSetRate} />}
              {rate >= 4 ? <FilledStar4 data-value={4} onClick={handleSetRate} /> : <Star4 data-value={4} onClick={handleSetRate} />}
              {rate >= 5 ? <FilledStar5 data-value={5} onClick={handleSetRate} /> : <Star5 data-value={5} onClick={handleSetRate} />}
            </div>
            <Heading as={'h2'} className={'mt-2 text-start text-accent-l-50'}>
              اكتب رايك
            </Heading>
            <textarea className="bg-accent-300 my-6 min-h-72 w-full flex-1 resize-none rounded-lg border border-accent-l-50 p-4 text-xl" placeholder="اكتب رايك هنا" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <Button>إرسال</Button>
          </form>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-6">
          <Testimonial type="sec" />
        </div>
      </div>
    </div>
  );
}
