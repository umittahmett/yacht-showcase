import { logout } from "@/app/auth/logout/actions";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form>
      <button
        className="flex cursor-pointer items-center gap-2.5"
        type="submit"
        formAction={logout}
      >
        <LogOut />
        Log out
      </button>
    </form>
  );
};

export default LogoutButton;
