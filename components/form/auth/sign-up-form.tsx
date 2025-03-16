"use client";
import { Input } from "../../ui/input";
import { PasswordInput } from "../../ui/password-input";
import { Button } from "../../ui/button";
import { signup } from "@/app/auth/sign-up/actions";
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
import { signUpSchema } from "@/lib/validation/form-schemas";
import Link from "next/link";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof typeof data]);
      });
      await signup(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="relative z-10 space-y-4">
        <div className="mb-8">
          <h3 className="text-neutral-900 text-3xl font-bold">Sign up</h3>
          <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
            Create an account and explore a world of possibilities.
          </p>
        </div>

        <form
          className="relative z-10 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
            Sign up
          </Button>
        </form>

        <p className="text-sm text-neutral-500">
          Already have an account
          <Link
            href="/auth/sign-in"
            className="text-sky-600 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
