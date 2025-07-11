"use client";
import { Button } from "../../ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { resetPasswordSchema } from "@/lib/validation/schemas/form-schemas";
import { PasswordInput } from "../../ui/password-input";
import { resetPassword } from "@/app/auth/reset-password/actions";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);
      await resetPassword(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="relative z-10 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative z-10 space-y-4">
          <div className="mb-8">
            <h3 className="text-neutral-900 text-3xl font-bold">
              Reset Password
            </h3>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Enter your new password to recover your account
            </p>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="block"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
