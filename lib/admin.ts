import { ALLOWED_IDS } from "@/constants";
import { auth } from "@clerk/nextjs/server";

const getUserId = async () => {
  return new Promise<string | null>(async (resolve, reject) => {
    const { userId } = await auth();
    if (userId) resolve(userId);
    else {
      reject(null);
    }
  });
};


export const isAdmin = async () => {
  const userId = await getUserId();
  if (!userId) return false;
  return ALLOWED_IDS.indexOf(userId) !== -1;
};
