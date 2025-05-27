import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

export type MutationFunctionType = (
    mutationKey: UseMutationOptions["mutationKey"],
    mutationFn: UseMutationOptions<any, any, any>["mutationFn"],
    options?: Omit<UseMutationOptions<any, any>, "mutationFn" | "mutationKey">,
) => UseMutationResult<any, any, any, any>;