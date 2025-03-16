"use client";
import { Input } from "../../ui/input";
import { PasswordInput } from "../../ui/password-input";
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
import { signInSchema } from "@/lib/validation/form-schemas";
import { signin } from "@/app/auth/sign-in/actions";
import Link from "next/link";

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof typeof data]);
      });
      await signin(formData);
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
            <h3 className="text-neutral-900 text-3xl font-bold">Sign in</h3>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Sign in to your account and explore a world of possibilities. Your
              journey begins here.
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
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

            <Link
              href="/auth/recover"
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="block"
          >
            Sign in
          </Button>

          <div className="text-sm text-neutral-500">
            Don't have an account
            <Link
              href="/auth/sign-up"
              className="text-sky-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
