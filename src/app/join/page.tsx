'use client'

import Link from "next/link";
import SectionMenu from "@/components/SectionMenu";
import { createUser } from "@/actions/actions";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, userSchemaType } from "@/lib/zodSchemas";
import JoinButton from "@/components/JoinButton";

// 회원가입 페이지 
export default function Page() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<userSchemaType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
          userId: '',
          name: '',
          password: '',
          confirmPassword: '',

          // 여기 들어오는 값은 이제 아이디값으로 들어오는 값이 기본값
        },
      });
    
      // 폼에서 사용하는 데이터 타입 (onSubmit) 에러 처리
      interface FormData {
        userId: string;
        name: string;
        password: string;
        confirmPassword: string;
      }
      
      // handleSubmit로 데이터 유효성 체크한 뒤에 폼데이터 제출
      const onSubmit = async (formData : FormData) => {
        // 여기서 서버에서 오는 결과 try-catch 처리
        try {
          await createUser(formData);
          console.log('회원가입이 완료되었습니다.');
          alert('회원가입이 완료되었습니다.');
        } catch (error: any) {
          console.error('회원가입 실패:', error.message); // 에러 메시지 출력
          alert('회원가입 실패! 관리자에게 문의해주세요.');
        }
      };
      
    return (
        <>
        <SectionMenu title={'회원가입'}/>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-5 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div id="userIdInput">
                                {/* 중복확인으로 무결성체크 해야함. */}
                                <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">아이디</label>
                                <input type="text" {...register('userId')} 
                                 id="userId" placeholder="아이디는 10자 이하로 입력해주세요"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                 <JoinButton/>
                            </div>
                            {errors.userId && <span className="text-red-500 text-xs ml-2">{errors.userId.message}</span>} 
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                                <input type="text" {...register('name')}  
                                 id="name" placeholder="이름은 10자 이하로 입력해주세요"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.name && <span className="text-red-500 text-xs ml-2">{errors.name.message}</span>}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                <input type="password" {...register('password')} 
                                 id="password" placeholder="영문자, 숫자, 특수문자 10 ~ 12자" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.password && <span className="text-red-500 text-xs ml-2">{errors.password.message}</span>}
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
                                <input type="password" {...register('confirmPassword')} 
                                 id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {errors.confirmPassword && <span className="text-red-500 text-xs ml-2">{errors.confirmPassword.message}</span>}
                            {/* 아이디 / 비밀번호 찾기 구현 */}
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div> */}
                            <button type="submit" className="w-full text-white bg-[#86a1ce] hover:bg-[#658DA6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                계정이 이미 존재한다면? <Link href={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">로그인 하기</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
        
    )
}