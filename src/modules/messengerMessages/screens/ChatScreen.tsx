import { MainFixedLayout, Scroll } from "@/components/layout/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { useUsersStore } from "@/modules/users/usersStore";
import { useCurrentUserStore } from "@/stores/authDataStore";
import { useState } from "react";
import { ChatMessage } from "../ChatMessage";
import { createMessengerMessageRecord } from "../dbMessengerMessagesUtils";
import { useMessengerMessageRecordsStore } from "../messengerMessagesStore";
import { MessengerMessageTextarea } from "../MessengerMessageTextarea";

const useRecipientWithMessengerMessages = (p: { contactId: string }) => {
  const currentUserStore = useCurrentUserStore();
  const usersStore = useUsersStore();
  const messengerMessagesStore = useMessengerMessageRecordsStore();

  if (currentUserStore.data.authStatus === "loading") return { status: "loading" } as const;
  if (currentUserStore.data.authStatus === "loggedOut") return { status: "error" } as const;
  // This should never be hit
  if (currentUserStore.data.authStatus !== "loggedIn") return { status: "error" } as const;

  const currentUser = currentUserStore.data.user;

  if (usersStore.data === undefined) return { status: "loading" } as const;
  if (usersStore.data === null) return { status: "error" } as const;

  const recipient = usersStore.data.find((x) => x.id === p.contactId);
  if (recipient === undefined) return { status: "error" } as const;

  if (messengerMessagesStore.data === undefined) return { status: "loading" } as const;
  if (messengerMessagesStore.data === null) return { status: "error" } as const;

  const messages = messengerMessagesStore.data.filter(
    (x) => x.recipientId === p.contactId || x.senderId === p.contactId,
  );

  return { status: "success", data: { currentUser, recipient, messages } } as const;
};

export const ChatScreen = (p: { contactId: string }) => {
  const recipientWithMessengerMessages = useRecipientWithMessengerMessages({
    contactId: p.contactId,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [text, setText] = useState("");
  return (
    <MainFixedLayout>
      {(() => {
        if (recipientWithMessengerMessages.status === "loading") return <div>loading</div>;
        if (recipientWithMessengerMessages.status === "error") return <div>error</div>;

        const { recipient, messages, currentUser } = recipientWithMessengerMessages.data;

        return (
          <>
            <Scroll className="flex flex-col gap-3 p-6">
              {messages.map((x) => (
                <ChatMessage
                  key={x.id}
                  message={x}
                  user={x.senderId === currentUser.id ? currentUser : recipient}
                  isOwnMessage={x.senderId === currentUser.id}
                />
              ))}
            </Scroll>
            <div className="p-2 pt-0">
              <MessengerMessageTextarea
                value={text}
                onInput={(x) => setText(x)}
                disabled={isLoading}
                onSubmit={async () => {
                  if (isLoading) return;

                  setIsLoading(true);
                  const resp = await createMessengerMessageRecord({
                    pb,
                    data: {
                      text,
                      senderId: recipientWithMessengerMessages.data.currentUser.id,
                      recipientId: recipientWithMessengerMessages.data.recipient.id,
                    },
                  });
                  setIsLoading(false);

                  if (resp.success) setText("");
                }}
              />
            </div>
          </>
        );
      })()}
    </MainFixedLayout>
  );
};
