import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import { PostStatusType } from "../types";
import useSearchPosts from "../hooks/useSearchPosts";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const { isLoading, isError, error, data } = useGetPosts(selectedPostStatus);
  const searchData = useSearchPosts(searchQuery);

  if (isLoading || searchData.isLoading) return <div>Loading...</div>
  if (isError) return <div>Error { error.message }</div>
  if (searchData.isError) return <div>Error { searchData.error.message }</div>

  return (
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
  );
}

export default PostList;
