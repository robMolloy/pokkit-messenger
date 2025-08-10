import { PocketBase } from "@/config/pocketbaseConfig";
import { RecordFullListOptions } from "pocketbase";
import { z } from "zod";

export const createCollectionRecord = async <TSchema extends z.ZodSchema<{ id: string }>>(p: {
  pb: PocketBase;
  collectionName: string;
  schema: TSchema;
  data: Omit<z.infer<TSchema>, "collectionId" | "collectionName" | "id" | "created" | "updated">;
}) => {
  try {
    const resp = await p.pb.collection(p.collectionName).create(p.data);
    return p.schema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};
export const updateCollectionRecord = async <TSchema extends z.ZodSchema<{ id: string }>>(p: {
  pb: PocketBase;
  collectionName: string;
  schema: TSchema;
  data: Partial<
    Omit<z.infer<TSchema>, "collectionId" | "collectionName" | "id" | "created" | "updated">
  > & { id: string };
}) => {
  try {
    const resp = await p.pb.collection(p.collectionName).update(p.data.id, p.data);
    return p.schema.safeParse(resp);
  } catch (error) {
    console.error(error);
    return { success: false, error } as const;
  }
};

export const subscribeToCollectionRecords = async <TSchema extends z.ZodSchema<{ id: string }>>(p: {
  pb: PocketBase;
  collectionName: string;
  initData: z.infer<TSchema>[];
  onChange: (x: z.infer<TSchema>[]) => void;
  schema: TSchema;
  onError: () => void;
}) => {
  let records = [...p.initData];
  try {
    const unsub = p.pb.collection(p.collectionName).subscribe("*", (e) => {
      if (e.action === "create") {
        const parseResp = p.schema.safeParse(e.record);
        if (parseResp.success) records.push(parseResp.data);
      }
      if (e.action === "update") {
        const parseResp = p.schema.safeParse(e.record);
        if (!parseResp.success) return;

        records = records.filter((x) => parseResp.data?.id !== x.id);
        records.push(parseResp.data);
      }
      if (e.action === "delete") {
        const parseResp = p.schema.safeParse(e.record);
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

export const listCollectionRecords = async <TSchema extends z.ZodSchema<{ id: string }>>(p: {
  pb: PocketBase;
  collectionName: string;
  schema: TSchema;
  options?: RecordFullListOptions;
}) => {
  try {
    const initData = await p.pb.collection(p.collectionName).getFullList(p.options);

    const data = initData
      .map((x) => p.schema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};
