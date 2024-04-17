import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import modifyPost from "./modifyPost";

const Modify = ({ list }) => {
    const { id } = useParams();
    const itm = list.find(it => String(it.id) === id) || { title: " ", author: " ", content: " " };

    const [inputs, setInputs] = useState({
        title: itm.title,
        author: itm.author,
        content: itm.content
    })

    const navigate = useNavigate();

    const onModify = async () => {
        try {
            if (inputs.title.length < 1) {
                alert('제목은 1자 이상 입력해야 합니다.');
                return;
            }
            // 포스트 수정 요청 보내기
            await modifyPost(id, inputs);
            // 성공적으로 수정되면 리스트 페이지로 이동
            navigate('/list');
        } catch (error) {
            console.error('Error modifying post:', error);
            // 수정 실패 시 에러 처리
            // 이 부분에서 적절한 에러 처리 로직을 추가하세요
        }
    }

   

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <>
            <ul>
                <li>
                    <span>제목</span>
                    <input name="title" value={inputs.title} onChange={onChange} />
                </li>
                <li>
                    <span>작성자</span>
                    <input name="author" value={inputs.author} onChange={onChange} />
                </li>
                <li>
                    <span>내용</span>
                    <textarea name="content" value={inputs.content} onChange={onChange} />
                </li>
            </ul>
            <button onClick={onModify}>수정</button>
        </>
    )
}

export default Modify;
