import { toast } from "react-toastify";

export const toastMsg = (text: string, isError: boolean = false ) => {
  isError ? toast.error(text) : toast.success(text);
};

export function getErrorMessage(err: any): string {
  if (typeof err === "string") {
    return err;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "An error occurred";
}
