"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role_id: number; // 👈 role_id is inside the token
  exp?: number;
}
export default function Page() {
  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRoleId(decoded.role_id);
      } catch (err) {
        console.error("Invalid token", err);
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
      <div className="mt-24">
        {roleId == 1 ? (
          <div className="text-gray-800 text-2xl font-semibold text-center">
            <h1>Welcome to Your Dashboard</h1>
          </div>
        ) : roleId == 2 ? (
          <div className="text-gray-800 text-2xl font-semibold text-center">
            <h1>Welcome to Your Dashboard</h1>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
