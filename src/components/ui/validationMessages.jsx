import { set } from "date-fns";
import { CircleCheck, Info } from "lucide-react";

export function ErrorMessage({message}) {
  return <div className="flex items-center gap-1 text-red-600">
    <Info className="w-5 h-5" />
    <p className="mt-2">{message}</p>
  </div>;
}

export function PasswordStrength({password, setIsValidPassword}) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNonAlphabetic = /[\W_]/.test(password);
  const isLongEnough = password.length >= 8;
  setIsValidPassword(hasLowercase && hasUppercase && hasNonAlphabetic && isLongEnough);
  return (
    <div>
      <h3>تحقق من كلمة المرور:</h3>
      <ul>
        <li style={{ color: hasLowercase ? 'green' : 'red' }} className="flex items-center gap-1">
          <CircleCheck className="w-5" /> <p>يجب أن تحتوي على أحرف صغيرة</p>
        </li>
        <li style={{ color: hasUppercase ? 'green' : 'red' }} className="flex items-center gap-1">

          <CircleCheck className="w-5" /> <p>يجب أن تحتوي على أحرف كبيرة</p>
        </li>
        <li style={{ color: hasNonAlphabetic ? 'green' : 'red' }} className="flex items-center gap-1">
          <CircleCheck className="w-5" /> <p>يجب أن تحتوي على رموز خاصة مثل @, #, !</p>
        </li>
        <li style={{ color: isLongEnough ? 'green' : 'red' }} className="flex items-center gap-1">
          <CircleCheck className="w-5" /> <p>يجب أن تكون طولها 8 أحرف على الأقل</p>

        </li>
      </ul>
    </div>
  );
}
