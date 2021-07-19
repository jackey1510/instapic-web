import { useGetIntId } from "./useGetIntId";
import { usePostQuery } from "../generated/graphql";

export const useGetPostFromUrl = () => {
  const id = useGetIntId();
  return usePostQuery({
    variables: {
      id,
    },
    pause: id === -1,
  });
};
