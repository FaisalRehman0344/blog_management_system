import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from "@tanstack/react-query";
import { MutationFunctionType } from "types";

export function useRequestProcessor(): {
    useMutate: MutationFunctionType;
} {
    const queryClient = useQueryClient();

    function useMutate(
        mutationKey: UseMutationOptions["mutationKey"],
        mutationFn: UseMutationOptions["mutationFn"],
        options: Omit<UseMutationOptions, "mutationFn" | "mutationKey"> = {},
    ) {
        return useMutation({
            mutationKey,
            mutationFn,
            onSettled: (data, error, variables, context) => {
                queryClient.invalidateQueries({ queryKey: mutationKey });
                options.onSettled && options.onSettled(data, error, variables, context);
            },
            ...options,
            retry: options.retry ?? 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        });
    }

    return { useMutate };
}
