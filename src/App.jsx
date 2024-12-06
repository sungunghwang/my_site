import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
   const [data, setData] = useState([]);
   const ipt1 = useRef();
   const ipt2 = useRef();
   const ipt3 = useRef();

   async function getData() {
      try {
         //const response = await fetch('http://127.0.0.1:4000/api/data');
         const response = await fetch('http://134.185.104.172:4000/api/data');
         if (!response.ok) {
            throw new Error('데이터 가져오는데 실패했습니다.');
         }
         const data = await response.json();
         //console.log(data);
         setData(data.results);
      } catch (err) {
         console.error(err.message);
      }
   }

   useEffect(() => {
      getData();
   }, []);

   async function postData(newItem) {
      console.log('==========', newItem);
      try {
         //const response = await fetch('http://127.0.0.1:4000/api/data', {
         const response = await fetch('http://134.185.104.172:4000/api/data', {
            method: 'POST', // HTTP 메서드 설정
            headers: {
               'Content-Type': 'application/json', // 전송 데이터 형식 지정
            },
            body: JSON.stringify(newItem), // 데이터를 JSON 문자열로 변환
         });

         if (!response.ok) {
            throw new Error(`POST 요청 실패. 상태 코드: ${response.status}`);
         }
         //const data = await response.json(); // 서버에서 반환된 데이터
         //console.log('서버 응답:', data);
         getData();
      } catch (err) {
         console.error('에러 발생:', err.message);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
         name: ipt1.current.value,
         email: ipt2.current.value,
         nickName: ipt3.current.value,
      };
      console.log(newItem);

      postData(newItem);
      ipt1.current.value = '';
      ipt2.current.value = '';
      ipt3.current.value = '';
   }
   return (
      <>
         <h1>테스트 제목</h1>
         <form onSubmit={handleSubmit}>
            <ul>
               <li>
                  이름 : <input type="text" ref={ipt1} />
               </li>
               <li>
                  이메일 : <input type="text" ref={ipt2} />
               </li>
               <li>
                  별명 : <input type="text" ref={ipt3} />
               </li>
            </ul>
            <button type="submit">제출</button>
         </form>
         <ul>
            {data.length > 0 ? (
               data?.map((item, idx) => {
                  return (
                     <li key={idx}>
                        {item.name}
                        {item.email}
                        {item.nickName}
                     </li>
                  );
               })
            ) : (
               <li>데이터가 없습니다.</li>
            )}
         </ul>
      </>
   );
}

export default App;
