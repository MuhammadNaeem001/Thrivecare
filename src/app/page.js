// app/page.tsx
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/auth/signin");
  // }

  return (
    <div>
     <Link href={"/auth/signin"}>Sign In </Link>
     <Link href={"/auth/signup"}>Sign up </Link>
    </div>
  );
}
