import { CustomIcon } from "@/components/CustomIcon";
import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { useUsersStore } from "@/modules/users/usersStore";
import Link from "next/link";

export const RecipientsScreen = () => {
  const usersStore = useUsersStore();
  return (
    <MainLayout>
      <H1>Recipients screen</H1>
      {(() => {
        if (usersStore.data === undefined) return <div>loading</div>;
        if (usersStore.data === null) return <div>error</div>;
        return (
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            {usersStore.data.map((x) => (
              <Link
                key={x.id}
                href={`/message/${x.id}`}
                className="flex gap-4 rounded border p-4 hover:bg-secondary"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-xl">
                  {x.name
                    .toUpperCase()
                    .split(/[. ]/)
                    .map((x) => x.slice(0, 1))
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex flex-col gap-2">
                  <div>{x.name}</div>
                  <div className="flex items-center gap-4">
                    <CustomIcon iconName="Mail" size="md" />
                    {x.email}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      })()}
    </MainLayout>
  );
};
