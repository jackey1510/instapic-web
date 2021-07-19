import { useRouter } from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  return router.query.id ? Number(router.query.id) : -1;
};
