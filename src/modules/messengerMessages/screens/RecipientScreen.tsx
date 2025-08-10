import { MainFixedLayout, Scroll } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { Textarea } from "@/components/ui/textarea";
import { useMessengerMessageRecordsStore } from "../messengerMessagesStore";
import { useUsersStore } from "@/modules/users/usersStore";

const useRecipientWithMessengerMessages = (p: { recipientId: string }) => {
  const usersStore = useUsersStore();
  const messengerMessagesStore = useMessengerMessageRecordsStore();

  if (usersStore.data === undefined) return { status: "loading" } as const;
  if (usersStore.data === null) return { status: "error" } as const;

  const recipient = usersStore.data.find((x) => x.id === p.recipientId);
  if (recipient === undefined) return { status: "error" } as const;

  if (messengerMessagesStore.data === undefined) return { status: "loading" } as const;
  if (messengerMessagesStore.data === null) return { status: "error" } as const;

  const messages = messengerMessagesStore.data.filter(
    (x) => x.recipientId === p.recipientId || x.senderId === p.recipientId,
  );

  return { status: "success", data: { recipient, messages } } as const;
};
export const RecipientScreen = (p: { recipientId: string }) => {
  const recipientWithMessengerMessages = useRecipientWithMessengerMessages({
    recipientId: p.recipientId,
  });
  return (
    <MainFixedLayout>
      <H1>Scrolling page with fixed items</H1>

      {(() => {
        if (recipientWithMessengerMessages.status === "loading") return <div>loading</div>;
        if (recipientWithMessengerMessages.status === "error") return <div>error</div>;

        return (
          <Scroll>
            <div>{recipientWithMessengerMessages.data.recipient.name}</div>
            {recipientWithMessengerMessages.data.messages.map((x) => (
              <div key={x.id}>{x.text}</div>
            ))}
          </Scroll>
        );
      })()}

      <Textarea placeholder="Type something here" />
    </MainFixedLayout>
  );
};
