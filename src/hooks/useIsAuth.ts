import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "./useMeQuery";

/**
 * Check if user is signed in, if not direct to login page
 */
export const useIsAuth = () => {
  const { data, isFetching } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!isFetching && !data) {
      router.replace("/login?next=" + router.pathname);
    }
    return () => {};
  }, [isFetching, data, router]);
};
