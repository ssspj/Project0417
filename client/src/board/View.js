import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // axios 추가

const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // axios를 사용하여 서버에서 포스트 데이터 가져오기
        axios.get(`http://localhost:5000/api/view/${id}`)
            .then(response => {
                setPost(response.data.post);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, [id]);

    // const onDelete = async () => {
    //     try {
    //         // 서버에 삭제 요청 보내기
    //         const response = await axios.delete(`http://localhost:5000/api/delete/${id}`);
    //         // 삭제 성공시 리스트 페이지로 이동
    //         navigate('/list');
    //     } catch (error) {
    //         console.error('Error deleting post:', error);
    //     }
    // };

    const onModify = () => {
        navigate(`/modify/${id}`);
    };

    return (
        <>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>작성자: {post.author}</p>
                    <p>{post.content}</p>
                    {/* <button onClick={onDelete}>삭제</button> */}
                    <button onClick={onModify}>수정</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default View;


// import { useNavigate, useParams } from "react-router-dom";

// const View = ({ list, setList }) => {
//     const { id } = useParams();
//     const itm = list.find(it => String(it.id) === id);

//     const navigate = useNavigate()

//     const onModify = () => {
//         navigate(`/modify/${id}`)
//     }


//     const onDelete = () => {
//         //list 에서 id === id 를 제외한 새배열을 만듦
//         const r = list.filter(it => String(it.id) !== id)
//         setList(r)
//         navigate('/list')
//     }

//     return (
//         <>
//             <ul>
//                 <li>
//                     <span>제목</span>
//                     <strong>{itm.subject}</strong>
//                 </li>
//                 <li>
//                     <span>이름</span>
//                     <strong>{itm.name}</strong>
//                 </li>
//                 <li>
//                     <span>날짜</span>
//                     <strong>{itm.date}</strong>
//                 </li>
//                 <li>
//                     <span>내용</span>
//                     <strong style={{ whiteSpace: 'pre-line' }}>{itm.content}</strong>
//                 </li>
//             </ul>
//             <button onClick={onDelete}>삭제</button>
//             <button onClick={onModify}>수정</button>

//         </>
//     )
// }
// export default View;