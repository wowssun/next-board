'use client'

import Link from "next/link"
import { updatePost } from "@/actions/actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { postSchema, postSchemaType } from "@/lib/zodSchemas";

export default function EditForm(props: any) {
    const id = props.id;
    const p= props.page;

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<postSchemaType>({
        resolver: zodResolver(postSchema),
        defaultValues: {
          title: '',
          content: '',
          authorId: '',
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
        console.log(id);
        console.log(p);
        // 여기서 서버에서 오는 결과 try-catch 처리
    //     try {
    //     //   await updatePost(formData);
    //       console.log('게시물이 수정되었습니다.');
    //     } catch (error: any) {
    //       console.error('게시물 수정 실패:', error.message); // 에러 메시지 출력
    //       alert('게시물 수정 실패! 관리자에게 문의해주세요.');
    //     }
      };

return (
    <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <form onSubmit={(handleSubmit(onSubmit))} className="space-y-8">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">제목</label>
                            <input type="text"
                             id="title" 
                             {...register('title')}
                            //  defaultValue={post.title}
                             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        {/* {errors.title && <span className="text-red-500 text-xs ml-2">{errors.title.message}</span>} */}
                        <div>
                            <label htmlFor="authorId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">작성자</label>
                            <input type="text" 
                            id="authorId" 
                            {...register('authorId')} 
                            // value={post.authorId}
                            readOnly 
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">본문</label>
                            <textarea id="content" 
                            {...register('content')} 
                            rows={6} 
                            // defaultValue={post.content}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" ></textarea>
                        </div>
                        {/* {errors.content && <span className="text-red-500 text-xs ml-2">{errors.content.message}</span>} */}
                        <div className="flex justify-center">
                            <Link href={`/board/view/${id}?page=${p}`} className="mr-5 py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">취소하기</Link>
                            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg  bg-blue-700 hover:bg-blue-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">수정하기</button>
                        </div>    
                    </form>
                </div>
        </section>
    )
}
