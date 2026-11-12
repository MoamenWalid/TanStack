import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostItem, PostStatusType } from "../types";

const fetchPosts = async(selectedPostStatus: PostStatusType): Promise<PostItem[]> => {
  if (selectedPostStatus == "all") {
    const result = await axios.get<PostItem[]>('http://localhost:3009/posts');
    return result.data;
  } else {
    const result = await axios.get<PostItem[]>(`http://localhost:3009/posts?status=${selectedPostStatus}`);
    return result.data;
  }
}

const useGetPosts = (selectedPostStatus: PostStatusType): UseQueryResult<PostItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus }],
    queryFn: () => fetchPosts(selectedPostStatus),
    staleTime: 1000 * 10
  });  
  return query;
}

export default useGetPosts;