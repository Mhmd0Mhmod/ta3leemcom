import { Button } from '@/components/ui/button';
import Heading from '@/UI-Global/Heading';
import { SolidLogo } from '@/UI-Global/SolidLogo';
import React from 'react';
import { Link } from 'react-router-dom';
import TestSent from '@public/Icons/test_sent_icon.svg';

export default function ShowTestAlert({ setShowTestAlert, setShowTestRes, setOpenModel, setDummyQuestions, questions }) {
  return (
    <>
      <div className="flex flex-col items-center py-32">
        <TestSent className="mx-auto" />
        <Heading as={'h2'} className={'my-6 font-almaria-bold text-black'}>
          لقد تم إرسال إجاباتك بنجاح.
        </Heading>
        <p className="mb-8 mt-4 text-lg">شكراً لك على إرسال إجاباتك. </p>
        <div className="flex items-center gap-3 font-almaria-bold text-secondary-l">
          <Button
            onClick={() => {
              setShowTestRes(true);
              setShowTestAlert(false);
            }}
            variant="outline"
            className="border-secondary-l px-10 py-7 text-xl hover:text-secondary-l"
          >
            النتيجة
          </Button>
          <Button
            onClick={() => {
              setShowTestAlert(false);
              setOpenModel(true);
              setDummyQuestions(
                questions.map((question) => ({
                  ...question,
                  answers: question.answers.map((answer) => ({
                    ...answer,
                    isCorrect: false,
                  })),
                })),
              );
            }}
            variant="ghost"
            className="px-10 py-7 text-xl hover:text-secondary-l"
          >
            إرسال رد آخر
          </Button>
        </div>
      </div>
      <div>
        <SolidLogo />
        <p className="mt-2">
          إذا كان لديك أي استفسارات ، لا تتردد في{' '}
          <Link className="text-secondary-l underline" to={'/contact-with-us'}>
            التواصل معنا
          </Link>
          . نتمنى لك التوفيق!
        </p>
      </div>
    </>
  );
}
