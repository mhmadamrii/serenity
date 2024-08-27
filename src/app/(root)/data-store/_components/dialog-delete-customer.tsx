"use client";

import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

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

export function DialogDeleteCustomer({
  deleteId,
  setDeleteId,
  refresh,
}: {
  deleteId: string;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  refresh: () => void;
}) {
  const { mutate } = api.customer.deleteCustomer.useMutation({
    onSuccess: () => {
      toast.success("Successfully delete customer");
      refresh();
      setDeleteId("");
    },
    onError: (err) => console.log("error deletion", err),
  });

  return (
    <AlertDialog open={deleteId !== ""}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            customer and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteId("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate({ id: deleteId })}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
