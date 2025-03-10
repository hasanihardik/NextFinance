import { useQuery } from "@tanstack/react-query";

export const useGetSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await fetch("/api/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      return response.json();
    },
  });
};
