import axios from "axios";

const modifyPost = async (id, postData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/modify/${id}`, postData);
    return response.data; // 서버에서 받은 응답 데이터를 반환합니다.
  } catch (error) {
    console.error("Error modifying post:", error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 합니다.
  }
};

export default modifyPost;