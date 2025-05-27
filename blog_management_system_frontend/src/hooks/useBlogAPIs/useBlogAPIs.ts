import { UseMutationResult } from "@tanstack/react-query";
import { useRequestProcessor } from "./request-processor";
import { api } from "services";
import { Post } from "types";

const urls: any = {
    POST: '/posts',
}

const getURL = (key: string) => {
    return urls[key];
}

export type GetPostParams = { title?: string, content?: string, tag?: string, status?: string, page?: number, my?: boolean }

export const useGetPosts = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const getBlogs = async (params: GetPostParams): Promise<Post[]> => {
        const my = params.my;
        delete params.my;
        if (my) {
            const res = await api.get(`${getURL('POST')}/my`, { params })
            return res.data;
        }
        const res = await api.get(getURL('POST'), { params })
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["getBlogs"],
        getBlogs,
        options,
    );

    return mutation;
};

export const useCreatePost = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const createPost = async ({ post }: { post: Post }) => {
        const res = await api.post(getURL('POST'), post)
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["createPost"],
        createPost,
        options,
    );

    return mutation;
};

export const useUpdatePost = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const updatePost = async ({ post }: { post: Post }) => {
        const { title, content, tags } = post
        const res = await api.put(`${getURL('POST')}/${post.id}`, { title, content, tags })
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["updatePost"],
        updatePost,
        options,
    );

    return mutation;
};

export const useDeletePost = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const deletePost = async ({ postId }: { postId: string }) => {
        const res = await api.delete(`${getURL('POST')}/${postId}`)
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["updatePost"],
        deletePost,
        options,
    );

    return mutation;
};

export const usePublishUnpublish = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const publishUnpublishPost = async ({ postId, status }: { postId: string, status: string }) => {
        const res = await api.patch(`${getURL('POST')}/${postId}/${status}`)
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["publishUnpublishPost"],
        publishUnpublishPost,
        options,
    );

    return mutation;
};

export const useGetPostComments = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const getPostComments = async (postId: string) => {
        const res = await api.get(`${getURL('POST')}/${postId}/comments`)
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["getPostComments"],
        getPostComments,
        options,
    );

    return mutation;
};

export const useCreateComment = (options?: any) => {
    const { useMutate } = useRequestProcessor();

    const createComment = async ({ postId, content }: { postId: string, content: string }) => {
        const res = await api.post(`${getURL('POST')}/${postId}/comment`, { content })
        return res.data;
    }

    const mutation: UseMutationResult = useMutate(
        ["createComment"],
        createComment,
        options,
    );

    return mutation;
};



