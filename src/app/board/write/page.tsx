'use client'

import SectionMenu from "@/components/SectionMenu";
import Link from "next/link"
import { createPost } from "@/actions/actions";
import { postSchema, postSchemaType } from "@/lib/zodSchemas";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


// 게시글 작성 페이지
export default function Page() {
  const { data: session } = useSession(); // 세션 정보 가져오기
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

  useEffect(() => {

    if (!session) {
      setAlertMessage('권한이 없습니다. 홈으로 이동합니다.');
      setTimeout(() => {
        router.push('/'); // 3초 후 홈으로 리다이렉트
      }, 3000);
    }
  }, [session, status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      authorId: session?.user?.name || '',
      // 여기 들어오는 값은 이제 아이디값으로 들어오는 값이 기본값
    },
  });

  // 폼에서 사용하는 데이터 타입 (onSubmit) 에러 처리
  interface FormData {
    title: string;
    content: string;
    authorId: string;
  }
  
  // handleSubmit로 데이터 유효성 체크한 뒤에 폼데이터 제출
  const onSubmit = async (formData : FormData) => {
    
    // 여기서 서버에서 오는 결과 try-catch 처리
    try {
      await createPost(formData);
      console.log('게시물이 작성되었습니다.');
    } catch (error: any) {
      console.error('게시물 작성 실패:', error.message); // 에러 메시지 출력
      alert('게시물 작성 실패! 관리자에게 문의해주세요.');
    }
  };

  // 작성자 readonly 처리하는거 잊지말기
  return (
    <>
        <SectionMenu title={'게시판'}/>
        {alertMessage && (
        <div className="flex justify-center items-center h-screen"> {/* 전체 화면을 사용하여 중앙 정렬 */}
              <div className="alert alert-warning text-red-600 text-lg p-4 border border-red-600 rounded-md bg-red-100">
                {alertMessage}
              </div>
          </div>
          )}
         {!alertMessage && (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">제목</label>
                <input type="text" 
                  id="title" {...register('title')} 
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="제목을 작성하세요" />
              </div>
              {errors.title && <span className="text-red-500 text-xs ml-2">{errors.title.message}</span>}
              <div>
                <label htmlFor="authorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">작성자</label>
                <input type="text" id="authorId" {...register('authorId')} 
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="작성자를 작성하세요" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">본문</label>
                  <textarea id="content" {...register('content')}  
                  rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="본문을 작성하세요"></textarea>
              </div>
              {errors.content && <span className="text-red-500 text-xs ml-2">{errors.content.message}</span>}
              <div className="flex justify-center">
                  <Link href={'/board?page=1'} className="mr-5 py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">목록으로</Link>
                  <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">등록하기</button>
              </div>    
          </form>
          </div>
        </section>
        )}
    </>
  )
}