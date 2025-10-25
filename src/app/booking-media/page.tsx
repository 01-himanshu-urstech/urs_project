"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import List from "@/components/booking/list/page";

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
      <List />
    </div>
  );
}
