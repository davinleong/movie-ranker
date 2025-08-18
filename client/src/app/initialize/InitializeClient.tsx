"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Movie } from "@/types/movie";
import { createClient } from "@supabase/supabase-js";

export default function InitializeClient() {
  const { data: session } = useSession();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const userEmail = session?.user?.email || "Guest";
  const userInfo = session?.user || {};
  const userId = session?.user?.id || "unknown";
  // console.log("User Info:", userInfo);

  useEffect(() => {
    if (!session) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle(); // safe for 0 rows

      console.log("Fetched Profile Data:", data);
    };

    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      console.log("Fetched Profiles:", data);
    };
    // const fetchBio = async () => {
    //   const { data, error } = await supabase
    //     .from("profiles")
    //     .select()
    //     .eq("user_id", userId)
    //     .single();

    fetchProfile();
    fetchProfiles();
  });

  return (
    <>
      <div className="font-sans">
        <h1 className="text-2xl font-bold mb-4">Initialize</h1>
        <p>This page is for first time registration initialization</p>
        <p>
          Welcome, {userEmail}! Time to select your watched movies to get
          started.
        </p>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p>Email: {userEmail}</p>
        <p>User ID: {userId}</p>
        <p>Bio: {bio || "No bio set"}</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border rounded p-2 w-full h-24"
        />
        {/* <button
          onClick={updateBio}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Bio
        </button> */}
        {/* <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Edit Profile</h1>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border rounded p-2 w-full h-24"
        />
        <button
          onClick={updateBio}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Bio
        </button>
      </div> */}
      </div>
    </>
  );
}
