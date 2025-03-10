import { Button } from "@/components/ui/button";
import Link from "next/link";

const CheckEmailPage = () => {
  return (
    <div className="relative z-10">
      <div>
        <h3 className="text-neutral-900 text-3xl font-bold">
          Please Check Your E-mail
        </h3>
        <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
          If you you confirmed your email, you can close this tab and go back to
          the app.
        </p>
      </div>

      <Link href="/">
        <Button className="mt-10">Close this tab</Button>
      </Link>
    </div>
  );
};

export default CheckEmailPage;
