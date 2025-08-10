import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { useUsersStore } from "@/modules/users/usersStore";
import { useRouter } from "next/router";

export const RecipientsScreen = () => {
  const router = useRouter();
  const usersStore = useUsersStore();
  return (
    <MainLayout>
      <H1>Recipients screen</H1>
      {(() => {
        if (usersStore.data === undefined) return <div>loading</div>;
        if (usersStore.data === null) return <div>loading</div>;
        return (
          <div className="flex flex-col gap-2">
            {usersStore.data.map((x) => (
              <div key={x.id} onClick={() => router.push(`/message/${x.id}`)}>
                {x.name}
              </div>
            ))}
          </div>
        );
      })()}
      <pre>{JSON.stringify(usersStore, undefined, 2)}</pre>
    </MainLayout>
  );
};
