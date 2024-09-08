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

type IProps = {
  deleteId: string;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  refresh: () => void;
  title: string;
};

export function DialogDeletion({
  title,
  deleteId,
  setDeleteId,
  refresh,
}: IProps) {
  const { mutate: deleteProductFn } = api.product.deleteProduct.useMutation({
    onSuccess: () => {
      toast.success("Successfully delete product");
      refresh();
      setDeleteId("");
    },
    onError: (err) => console.log("error deletion", err),
  });

  const { mutate: deleteContactFn } = api.contact.deleteContact.useMutation({
    onSuccess: () => {
      toast.success("Successfully delete contact");
      refresh();
      setDeleteId("");
    },
    onError: (err) => console.log("error deletion", err),
  });

  const { mutate: deleteInvoiceFn } = api.invoice.deleteInvoice.useMutation({
    onSuccess: () => {
      toast.success("Successfully delete invoice");
      refresh();
      setDeleteId("");
    },
    onError: (err) => console.log("error deletion", err),
  });

  const handleDeletion = () => {
    switch (title) {
      case "product":
        deleteProductFn({ id: deleteId });
        break;

      case "contact":
        deleteContactFn({ id: deleteId });
        break;

      case "invoice":
        deleteInvoiceFn({ id: deleteId });
        break;

      default:
        break;
    }
  };

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
            {title} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteId("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletion}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
