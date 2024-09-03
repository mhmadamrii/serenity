import { useState, ChangeEvent } from "react";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { LockKeyhole } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function ChangePassword({ userId }: { userId: string }) {
  const [credential, setCredential] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { mutate, isPending } = api.credential.changePassword.useMutation({
    onSuccess: () => toast.success("Successfully change account's password!"),
    onError: () => toast.error("Incorrect current password!"),
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCredential((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitChangePassword = () => {
    if (credential.currentPassword === "" || credential.newPassword === "") {
      return toast.error("😡😡😡😡😡😡😡😡😡");
    }
    mutate({
      userId,
      currentPassword: credential.currentPassword,
      newPassword: credential.newPassword,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <LockKeyhole />
          Change Password
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <LockKeyhole />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-4">
            <div className="mb-6 flex flex-col gap-4">
              <Label>Current Password</Label>
              <Input
                disabled={isPending}
                name="currentPassword"
                onChange={handleChangeInput}
                placeholder="Current Password"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>New Password</Label>
              <Input
                disabled={isPending}
                name="newPassword"
                onChange={handleChangeInput}
                placeholder="New Password"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmitChangePassword}>
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
