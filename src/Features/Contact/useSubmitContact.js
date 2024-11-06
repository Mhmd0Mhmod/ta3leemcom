import { useMutation } from "@tanstack/react-query";
import { submitContact as submitContactAPI } from "./apiContact.js";

export function useSubmitContact() {
  const { mutate: submitContact, isPending } = useMutation({
    mutationFn: submitContactAPI,
  });
  return { submitContact, isPending };
}
