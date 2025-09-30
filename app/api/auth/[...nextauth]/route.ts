const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    // CredentialsProvider ... (comme déjà fait)
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Rediriger selon rôle après login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.includes("soignant")) return `${baseUrl}/soignant/missions`;
      if (url.includes("etablissement")) return `${baseUrl}/etablissement/candidats`;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
});
