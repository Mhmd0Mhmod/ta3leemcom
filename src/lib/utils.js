import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// *** Toast Alert ***
export const notify = (type, message, duration = 3000) =>
  toast[type](message, {
    duration,
  });

export const showToastForPromise = (promise, messages, options) => {
  toast.promise(promise, messages, options);
};
