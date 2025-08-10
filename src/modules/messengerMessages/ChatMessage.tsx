import { cn } from "@/lib/utils";
import { TUser } from "@/modules/users/dbUsersUtils";
import { TMessengerMessageRecord } from "./dbMessengerMessagesUtils";
import { formatRelativeTime } from "@/lib/dateUtils";

export const ChatMessage = (p: {
  message: TMessengerMessageRecord;
  user: TUser;
  isOwnMessage: boolean;
}) => {
  return (
    <div className={`flex ${p.isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[70%] flex-col items-start gap-1">
        <div className="text-xs text-muted-foreground">{p.user.name}</div>
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            p.isOwnMessage ? "bg-blue-500 text-white" : "bg-secondary",
          )}
        >
          <div className="whitespace-pre-wrap break-words">{p.message.text}</div>
          <div className="flex justify-end text-xs">{formatRelativeTime(p.message.created)}</div>
        </div>
      </div>
    </div>
  );
};
