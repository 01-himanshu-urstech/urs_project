"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Create from "@/components/booking/update/update";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userTokenTrainerAgregator");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div>
      <Create/>
    </div>
  );
}
