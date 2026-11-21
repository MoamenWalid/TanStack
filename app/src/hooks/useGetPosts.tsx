import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, PostStatusType } from "../types";

export const fetchPosts = async(selectedPostStatus: PostStatusType, paginate: number): Promise<PostItem[]> => {
  if (selectedPostStatus == "all") {
    const result = await axios.get<PostItem[]>(`http://localhost:3009/posts?_page=${paginate}&_limit=5`);
    return result.data;
  } else {
    const result = await axios.get<PostItem[]>(`http://localhost:3009/posts?status=${selectedPostStatus}`);
    return result.data;
  }
}

const useGetPosts = (selectedPostStatus: PostStatusType, paginate: number): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus, paginate }],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 15
  });
  return query;
}

export default useGetPosts;