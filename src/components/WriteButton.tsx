'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WriteButton() {
    const { data: session } = useSession(); // 세션 정보 가져오기
    const router = useRouter(); 

    const handleClick = () => {
        if (!session) {
          alert('회원만 작성할 수 있습니다.'); // 세션이 없으면 알림
          return;
        }

        router.push('/board/write');
    }

    return (
        <div className="relative sm:rounded-lg mx-auto mb-10 flex justify-end sm:justify-center">
        <button 
            onClick={handleClick}
            className="focus:outline-none text-[#071952] bg-[#FFDA76] hover:bg-[#F3CA52] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
            게시글 작성
         </button>
    </div>
    )
}