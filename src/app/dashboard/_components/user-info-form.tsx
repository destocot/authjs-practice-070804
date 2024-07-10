"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  UpdateUserInfoSchema,
  type UpdateUserInfoInput,
} from "@/validators/update-user-info-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { PencilIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { User } from "next-auth";
import { updateUserInfo } from "@/actions/update-user-info-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UpdateInfoFormProps = { user: User };

export const UserInfoForm = ({ user }: UpdateInfoFormProps) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const { id, name: defaultName } = user;

  const form = useForm<UpdateUserInfoInput>({
    resolver: valibotResolver(UpdateUserInfoSchema),
    defaultValues: { name: defaultName || "", id },
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: UpdateUserInfoInput) => {
    const res = await updateUserInfo(values);

    if (res.success) {
      const updatedUser = res.data;

      if (session?.user) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: updatedUser.name,
          },
        });
      }

      router.refresh();
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          if (nestedErrors && "name" in nestedErrors) {
            setError("name", { message: nestedErrors.name?.[0] });
          } else {
            setError("name", { message: "Internal Server Error" });
          }

          break;
        case 401:
        case 403:
          setError("name", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("name", { message: error });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-yellow-600 hover:bg-yellow-600/80">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>

          <DialogDescription>
            Update your user information below.
          </DialogDescription>

          <div className="my-2 h-1 bg-muted" />

          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="id" render={() => <FormMessage />} />

              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full"
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
