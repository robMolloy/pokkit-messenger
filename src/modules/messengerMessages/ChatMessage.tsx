import { cn } from "@/lib/utils";
import { TUser } from "@/modules/users/dbUsersUtils";

export const ChatMessage = (p: {
  message: React.ReactNode;
  user: TUser;
  isOwnMessage: boolean;
}) => {
  return (
    <div className="flex max-w-[70%] flex-col gap-1">
      <div className="mb-1 text-xs font-medium">{p.user.name}</div>
      <div className="flex">
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            p.isOwnMessage ? "bg-blue-500 text-white" : "bg-secondary",
          )}
        >
          <div className="whitespace-pre-wrap break-words text-sm">{p.message}</div>
        </div>
      </div>
    </div>
  );
};
