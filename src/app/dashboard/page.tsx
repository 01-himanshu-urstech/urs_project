"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard1 from "@/components/dashboard/dashboard-trainers/page";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role_id: number; // 👈 role_id is inside the token
  exp?: number;
}
export default function Page() {
  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null); // 👈 store role_id
  const [tokenGet, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setToken(token);
        setRoleId(decoded.role_id); // 👈 get role_id from token
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRoleId(null);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div>
      <div className="mt-24 ">
        {/* Example conditional rendering */}
        {roleId == 1 ? (
          <div className=" text-orange-300 text-3xl font-semibold text-center">
            <h1>DASHBOARD1</h1>
            <Dashboard1/>
          </div>
        ) : roleId == 2 ? (
          <div className=" text-orange-300 text-3xl font-semibold text-center">
            <h1>DASHBOARD2</h1>
          </div>
        ) : (
          // <List/>
          <h1>Loading...</h1>
        )}

        {/* You can render your List component here */}
        {/* {roleId === 1 && <List />} */}
      </div>
    </div>
  );
}
