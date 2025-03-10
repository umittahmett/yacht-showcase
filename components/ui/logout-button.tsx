import { logout } from "@/app/auth/logout/actions";
import { Button } from "./button";

const LogoutButton = () => {
  return (
    <form>
      <Button type="submit" formAction={logout}>
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
