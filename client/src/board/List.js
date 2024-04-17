import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Table = styled.table`
  border-top: 2px solid tomato;
  width: 100%;
`;

const Tr = styled.tr`
  height: 40px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
`;

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 게시글 목록 가져오는 요청
    axios.get("http://localhost:5000/api/getPost")
      .then(response => {
        setList(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <>
      <Table>
        <thead>
          <Tr>
            <Td>no</Td>
            <Td>제목</Td>
            <Td>글쓴이</Td>
            <Td>날짜</Td>
          </Tr>
        </thead>
        <tbody>
          {list.map((item, idx) => (
            <Tr key={item.id}>
              <Td>{idx + 1}</Td>
              <Td><Link to={`/view/${item.id}`}>{item.title}</Link></Td>
              <Td>{item.author}</Td>
              <Td>{item.date}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div>
        <button onClick={() => navigate('/write')}>글작성</button>
      </div>
    </>
  );
};

export default List;
