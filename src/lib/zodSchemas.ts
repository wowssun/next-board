import z from "zod";
import prisma from "./db";


export type postSchemaType = z.infer<typeof postSchema>;
export type userSchemaType = z.infer<typeof userSchema>;

const regexPwd = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{10,12}$/);


// 게시판 데이터 유효성 스키마
export const postSchema = z.object({
    title: z.string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: '제목은 50자 이하로 입력해주세요.' }),
    content: z.string().min(1, { message: '내용을 입력해주세요.' }),
    authorId: z.string().min(1),
  });

 
// 회원 데이터 유효성 스키마
// superRefine을 통해 비밀번호와 비밀번호 확인 체크
  export const userSchema = z.object({
    userId: z.string()
    .min(1, { message: '아이디를 입력해주세요.' })
    .max(10, { message: '아이디는 10자 이하로 입력해주세요.' }),
    name: z.string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(10, { message: '이름은 10자 이하로 입력해주세요.' }),
    password: z.string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .regex(regexPwd, { message: '영문자,숫자,특수문자 조합으로 10 ~ 12자로 입력해주세요.' }),
    confirmPassword: z.string()
    .min(1, { message: '비밀번호를 다시 입력해주세요.' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

 // 아이디 중복체크
export const asyncUserSchema = userSchema.superRefine(async ({ userId }, ctx) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (user) {
    ctx.addIssue({
      code: 'custom',
      message: '존재하는 아이디입니다.',
      path: ['userId'],
    });
  }
});
  

