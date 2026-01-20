import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts-edge";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "./lib/prisma";

const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as
          | { email: string; password: string }
          | undefined;
        if (!creds?.email || !creds?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });
        if (!user || !user.password) return null;

        const isVerified = compareSync(creds.password, user.password);
        if (!isVerified) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? "",
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      return session;
    },
    async jwt({ token, user, trigger }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.name === "NO_NAME") {
          token.name = user.email?.split("@")[0] ?? "User";
          try {
            await prisma.user.update({
              data: {
                name: token.name,
              },
              where: {
                id: user.id,
              },
            });
          } catch (error) {
            console.error("Failed to update user name:", error);
          }
        }
        // preserving carts if created when not logged in.
        if (trigger === "signIn" || trigger === "signUp") {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              await prisma.$transaction(async (tx) => {
                await tx.cart.deleteMany({
                  where: {
                    userId: user.id,
                  },
                });
                await tx.cart.update({
                  where: {
                    id: sessionCart.id,
                  },
                  data: {
                    userId: user.id,
                  },
                });
              });
            }
          }
        }
      }
      return token;
    },
    async authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/admin\/(.*)/,
        /\/order\/(.*)/,
        /\/payment-method/,
        /\/place-order/,
        /\/shipping-address/,
        /\/profile/,
        /\/user\/(.*)/,
      ];

      const { pathname } = request.nextUrl;
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      const cookie = request.cookies.get("sessionCartId");
      if (!cookie) {
        const sessionCartId = crypto.randomUUID();
        const response = NextResponse.next();
        response.cookies.set("sessionCartId", sessionCartId, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return response;
      }
      return true;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
