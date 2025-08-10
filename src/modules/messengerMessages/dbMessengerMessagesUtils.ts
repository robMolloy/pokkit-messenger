import { z } from "zod";
import PocketBase from "pocketbase";

const messengerMessageRecordSchema = z.object({
  collectionId: z.string(),
  collectionName: z.string(),
  id: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  text: z.string(),
  created: z.string(),
  updated: z.string(),
});
export type TMessengerMessageRecord = z.infer<typeof messengerMessageRecordSchema>;
export type TMessengerMessageRecordFormData = Omit<
  TMessengerMessageRecord,
  "collectionId" | "collectionName" | "id" | "created" | "updated"
>;

const collectionName = "messengerMessages";

export const createMessengerMessageRecord = async (p: {
  pb: PocketBase;
  data: TMessengerMessageRecordFormData;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).create(p.data);
    return messengerMessageRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const updateMessengerMessageRecord = async (p: {
  pb: PocketBase;
  data: TMessengerMessageRecord;
}) => {
  try {
    const resp = await p.pb.collection(collectionName).update(p.data.id, p.data);
    return messengerMessageRecordSchema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const listMessengerMessageRecords = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection(collectionName).getFullList({ sort: "-created" });

    const data = initData
      .map((x) => messengerMessageRecordSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToMessengerMessageRecords = async (p: {
  pb: PocketBase;
  initData: TMessengerMessageRecord[];
  onChange: (x: TMessengerMessageRecord[]) => void;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = messengerMessageRecordSchema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = messengerMessageRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = messengerMessageRecordSchema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
      }
      p.onChange([...records]);
    });

    return { success: true, data: unsub } as const;
  } catch (error) {
    p.onError();
    return { success: false, error } as const;
  }
};

export const smartSubscribeToMessengerMessageRecords = async (p: {
  pb: PocketBase;
  onChange: (x: TMessengerMessageRecord[]) => void;
  onError: () => void;
}) => {
  const listMessengerMessageRecordsResp = await listMessengerMessageRecords(p);
  if (!listMessengerMessageRecordsResp.success) {
    p.onError();
    return listMessengerMessageRecordsResp;
  }

  let allRecords = listMessengerMessageRecordsResp.data;
  p.onChange(allRecords);

  const subscribeResp = await subscribeToMessengerMessageRecords({
    pb: p.pb,
    initData: allRecords,
    onChange: (x) => {
      allRecords = x;
      p.onChange(allRecords);
    },
    onError: p.onError,
  });

  return subscribeResp;
};
