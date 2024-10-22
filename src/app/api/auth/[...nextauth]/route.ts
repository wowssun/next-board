import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
      // 아이디와 패스워드 형식으로 db 컨트롤 ( 로그인 )
        CredentialsProvider({
          name: "Credentials",
          // 만약에  credentials 지정한 로그인 폼을 사용하고 싶다면 아래의 폼 이용
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },

          // 로그인 요청이 들어왔을 때 인증을 처리하는 함수
          async authorize(credentials, req) {
            // 전달받은 자격 증명을 바탕으로 사용자 조회 로직 추가
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
            if (user) {
              // 사용자가 존재하면 로그인 성공, 사용자의 정보가 JWT에 저장된다.
              return user
            } else {
              // null을 반환하면 오류가 발생, 사용자에게 세부 정보를 확인하라는 메시지 표시.
              return null
      
              // 또한 이 콜백에서 에러를 던지면 사용자에게 오류 페이지로 리다이렉트되고, 오류 메시지가 쿼리 매개변수로 전달된다.
            }
          }
        })
      ]
});

export { handler as GET, handler as POST }