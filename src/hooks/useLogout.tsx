// src/hooks/useLogout.ts
import { useRouter } from "next/navigation";

const useLogout = (onLoggedOut?: () => void) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("userTokenTrainerAgregator");
    if (onLoggedOut) onLoggedOut(); // call callback to update state
    // router.push("/login"); // navigate without full refresh
    window.location.href = "/login"; // This forces a full reload and shows logout button
  };

  return logout;
};

export default useLogout;
