import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { PostStatusType } from "../types";
import useSearchPosts from "../hooks/useSearchPosts";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, isStale, refetch } = useGetPosts(selectedPostStatus, paginate);
  const searchData = useSearchPosts(searchQuery);

  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;
    queryClient.prefetchQuery({
      queryKey: ["posts", { selectedPostStatus: "all", paginate: nextPage }],
      queryFn: () => fetchPosts("all", nextPage),
    })
  }, [paginate, queryClient]);

  if (isLoading || searchData.isLoading) return <div>Loading...</div>
  if (isError) return <div>Error { error.message }</div>
  if (searchData.isError) return <div>Error { searchData.error.message }</div>

  return (
    <>
      {isStale && (
        <Button className="mb-3" onClick={() => refetch()}>
          Update Data
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.length === 0 && data?.map((el) => (
            <tr key={ el.id }>
              <td>{ el.id }</td>
              <td>
                <Link to="/info">{ el.title }</Link>
              </td>
              <td>{ el.status }</td>
              <td style={{ textAlign: "center" }}>
                <Form.Check type="switch" checked={ el.topRate } />
              </td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
          {searchQuery.length > 0 && searchData.data?.map((el) => (
            <tr key={ el.id }>
              <td>{ el.id }</td>
              <td>
                <Link to="/info">{ el.title }</Link>
              </td>
              <td>{ el.status }</td>
              <td style={{ textAlign: "center" }}>
                <Form.Check type="switch" checked={ el.topRate } />
              </td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedPostStatus == "all" && searchQuery.length <= 0 && (
        <ButtonGroup aria-label="Basic Example">
          <Button variant="light" onClick={() => setPaginate(1)}>1</Button>
          <Button variant="light" onClick={() => setPaginate(2)}>2</Button>
          <Button variant="light" onClick={() => setPaginate(3)}>3</Button>
        </ButtonGroup>
      )}
    </>
  );
}

export default PostList;
