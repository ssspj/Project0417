import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css"; 

const Write = ({ list, setList, idRef }) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const input = useRef([]);

    console.log(inputs);
    const time = new Date();

    const inputHandler = e => {
        const { name, value } = e.target;
        setInputs(
            {
                id: idRef.current,
                ...inputs,
                [name]: value,
                date: time.toLocaleDateString()
            }
        );
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {

            const inputsWithDetails = {
                ...inputs,
                title: inputs.subject, // 적절한 제목 값을 넣어주세요
                author: inputs.name, // 적절한 작성자 값을 넣어주세요
                content: inputs.content // 적절한 내용 값을 넣어주세요
            };
            const response = await fetch("http://localhost:5000/api/write12", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputsWithDetails)
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const data = await response.json();
            console.log(data.message); // 서버로부터 받은 응답 메시지 출력

            // 저장에 성공했을 때만 리스트에 추가
            setList([
                ...list,
                inputs
            ]);

            idRef.current = idRef.current + 1;

            navigate('/list');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    console.log(input.current.length, input.current[0])
   
    // const onSubmit = e => {
    //     e.preventDefault();
    //     for (let i = 0; i < input.current.length; i++) {
    //         if (input.current[i].value.length < 2) {
    //             alert(`${input.current[i].name}은 4자 이상 입력하세요`);
    //             input.current[i].focus();
    //             return
    //         }
    //     }
    //     // if (inputs.subject.length < 2) {
    //     //     alert('제목은 1자 이상 입력하세용');
    //     //     input.current[0].focus();
    //     //     return
    //     // }
    //     setList([
    //         ...list,
    //         inputs
    //     ]);

    //     idRef.current = idRef.current + 1;

    //     navigate('/list')
    // }

    return (
        <>
            <h2>글쓰기</h2>
            <form onSubmit={onSubmit}>
                <ul>
                    <li>
                        <label htmlFor="subject">제목</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[0] = el}
                        />
                    </li>
                    <li>
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[1] = el}
                        />
                    </li>
                    <li>
                        <label htmlFor="content">내용</label>
                        <textarea
                            type="text"
                            id="content"
                            name="content"
                            onChange={inputHandler}
                            required
                            ref={el => input.current[2] = el}
                        />
                    </li>
                </ul>
                <button>글작성</button>
            </form>
        </>
    )
}

export default Write