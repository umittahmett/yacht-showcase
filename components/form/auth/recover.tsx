"use client";
import { Button } from "../../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { recoverSchema } from "@/lib/validation/form-schemas";
import { recover } from "@/app/auth/recover/actions";
import { Input } from "@/components/ui/input";

const RecoverForm = () => {
  const form = useForm<z.infer<typeof recoverSchema>>({
    resolver: zodResolver(recoverSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof typeof data]);
    });

    recover(formData);
  };

  return (
    <Form {...form}>
      <form
        className="relative z-10 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative z-10 space-y-4">
          <div className="mb-8">
            <h3 className="text-neutral-900 text-3xl font-bold">Recover</h3>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Enter your e-mail to receive a recovery link
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

          <Button type="submit" className="block">
            Recover
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecoverForm;
