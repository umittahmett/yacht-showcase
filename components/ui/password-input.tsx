"use client";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { cn } from "@lib/utils";

const PasswordInput = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState("");

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2/3"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.disabled}
        >
          {showPassword ? (
            <EyeIcon className="size-4 cursor-pointer" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="size-4 cursor-pointer" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
