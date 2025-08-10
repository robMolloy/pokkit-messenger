import { ChatScreen } from "@/modules/messengerMessages/screens/ChatScreen";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const contactId = router.query.contactId as string;

  return <ChatScreen contactId={contactId} />;
}
