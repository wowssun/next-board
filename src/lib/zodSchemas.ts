import z from "zod";


export type postSchemaType = z.infer<typeof postSchema>;

export const postSchema = z.object({
    title: z.string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: '제목은 50자 이하로 입력해주세요.' }),
    content: z.string().min(1, { message: '내용을 입력해주세요.' }),
    authorId: z.string().min(1),
  });
  


  export const userSchema = z.object({
    id: z.string().min(1, { message: '아이디를 입력해주세요.' }),
    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  });
  
  

