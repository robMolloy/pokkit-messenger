import { CustomIcon } from "@/components/CustomIcon";
import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { TUser } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";
import Link from "next/link";

const DisplayUser = (p: { user: TUser }) => {
  return (
    <Link
      key={p.user.id}
      href={`/chat/${p.user.id}`}
      className="flex gap-4 rounded border p-4 hover:bg-secondary"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-xl">
        {p.user.name
          .toUpperCase()
          .split(/[. ]/)
          .map((x) => x.slice(0, 1))
          .slice(0, 2)
          .join("")}
      </div>
      <div className="flex flex-col gap-2">
        <div>{p.user.name}</div>
        <div className="flex items-center gap-4">
          <CustomIcon iconName="Mail" size="md" />
          {p.user.email}
        </div>
      </div>
    </Link>
  );
};

export const ContactsScreen = () => {
  const usersStore = useUsersStore();
  return (
    <MainLayout>
      <H1>Contacts</H1>
      <br />
      {(() => {
        if (usersStore.data === undefined) return <div>loading</div>;
        if (usersStore.data === null) return <div>error</div>;

        return (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            {usersStore.data.map((user) => (
              <DisplayUser key={user.id} user={user} />
            ))}
          </div>
        );
      })()}
    </MainLayout>
  );
};
