import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SearchClient from "./SearchClient";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <title>Search</title>
      <meta name="description" content="Search movies" />
      <SearchClient />;
    </>
  );
}
