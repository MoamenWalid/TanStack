import axios from "axios";
import { PostItem } from "../types";
import { useQuery } from "@tanstack/react-query";

const fetchPostsBySearch = async(searchQuery: string) => {
  const result = await axios.get<PostItem[]>(`http://localhost:3009/posts?q=${searchQuery}`);
  return result.data;
}

const useSearchPosts = (searchQuery: string) => {
  const query = useQuery({
    queryKey: ["posts", "search", { searchQuery }],
    queryFn: () => fetchPostsBySearch(searchQuery),
    staleTime: 1000 * 60 * 5,
    enabled: searchQuery.length > 0
  });

  return query;
}

export default useSearchPosts;
