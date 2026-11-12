import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";
import SearchQuery from "../components/SearchQuery";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPostStatus, setSelectedPostStatus] = useState<PostStatusType>("all");
  return (
    <Row>
      <Col xs={9}>
        <PostList
          selectedPostStatus={selectedPostStatus}
          searchQuery={searchQuery}
        />
      </Col>
      <Col>
        <SearchQuery setSearchQuery={setSearchQuery} />
        {searchQuery.length === 0 && (
          <PostFilter
            selectedPostStatus={selectedPostStatus}
            setSelectedPostStatus={setSelectedPostStatus}
          />
        )}
      </Col>
    </Row>
  );
};

export default Home;
