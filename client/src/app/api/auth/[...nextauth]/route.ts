import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // used to encrypt session tokens
  // pages: {
  //   signIn: "/", // custom sign-in page
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
