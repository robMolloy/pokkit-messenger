import { RecipientScreen } from "@/modules/messengerMessages/screens/RecipientScreen";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const recipientId = router.query.recipientId as string;

  return <RecipientScreen recipientId={recipientId} />;
}
