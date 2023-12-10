import { useInfiniteQuery } from "@tanstack/react-query";
import { getBe } from "api/index";

const PAGE_SIZE = 20;

const useExerciseQuery = (debouncedSearchText: string | null, filters: any) => {
  return useInfiniteQuery(
    ["exercises", debouncedSearchText, filters],
    async ({ pageParam = 0 }) =>
      await getBe({
        path: `/exercises`,

        params: {
          perPage: PAGE_SIZE,
          page: pageParam + 1,
          name: debouncedSearchText?.toLowerCase() ?? "",
          force: filters.force?.toLowerCase() ?? "",
          level: filters.level?.toLowerCase() ?? "",
          muscles: filters.primaryMuscle?.toLowerCase() ?? "",
          category: `${filters.category.toLowerCase()}`,
        },
      }),
    {
      cacheTime: 0,

      getNextPageParam: (lastPage, allPages) =>
        lastPage?.exercises?.length < 20 ? null : allPages.length,
      getPreviousPageParam: (firstPage, allPages) =>
        firstPage?.exercises.length < 20 ? null : allPages.length - 1,
    }
  );
};

export default useExerciseQuery;
