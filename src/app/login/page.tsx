'use client'

import Link from "next/link";
import SectionMenu from "@/components/SectionMenu";
import { loginSchema } from '../../lib/zodSchemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

// 로그인 페이지
export default function Page() {
    const router = useRouter(); 
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          userId: '',
          password: '',
        },
      });

      interface FormData {
        userId: string;
        password: string;
      }
      
      // handleSubmit로 데이터 유효성 체크한 뒤에 폼데이터 제출
      const onSubmit = async (formData : FormData) => {
        
        // 여기서 서버에서 오는 결과 try-catch 처리
        try {
            const result = await signIn("credentials", {
              userId: formData.userId,
              password: formData.password,
              redirect: false, // 여기서 false로 설정하여 결과를 받기
            });
      
            if (result?.error) {
              throw new Error(result.error); // 로그인 실패 시 에러 발생
            }
      
            // 로그인 성공 시 처리
            console.log('로그인이 완료되었습니다.');
            router.push("/"); // 홈 페이지로 이동
          } catch (error: any) {
            console.error('에러 메시지:', error.message); // 에러 메시지 출력
            alert(error.message); // 사용자에게 에러 메시지 알림
          }
      };

    return(
        <>
        <SectionMenu title={'로그인'}/>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">아이디</label>
                            <input type="text" {...register('userId')} 
                             id="userId" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {errors.userId && <span className="text-red-500 text-xs ml-2">{errors.userId.message}</span>}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                            <input type="password"{...register('password')}  
                             id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs ml-2">{errors.password.message}</span>}
                        <button type="submit" className="w-full text-white bg-[#86a1ce] hover:bg-[#658DA6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">로그인</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            계정이 없으신가요? <Link href={'/join'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">회원가입 하기</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>   
        </>
    )
}