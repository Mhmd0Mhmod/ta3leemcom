import Heading from "./Heading";
import SubscriptionsGrid from "./SubscriptionsGrid";

function UserSubscriptionUpgrade() {
  return (
    <div className="space-y-10">
      <Heading as={"h2"}>ترقية الاشتراك</Heading>
      <p className="text-lg">اختر من بين خطط الاشتراك التالية لترقية أو تغيير خطتك</p>

      <SubscriptionsGrid />
    </div>
  );
}
export default UserSubscriptionUpgrade;
