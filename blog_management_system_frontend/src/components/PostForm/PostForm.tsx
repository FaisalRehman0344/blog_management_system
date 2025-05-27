import { Autocomplete, Box, Button, Chip, createTheme, Modal, TextField, ThemeProvider, Typography } from "@mui/material";
import { useCreatePost, useUpdatePost } from "hooks/useBlogAPIs";
import { useEffect, useState } from "react";
import { Post } from "types";



export type PostFormProps = {
    post?: Post,
    open: boolean,
    onClose: any,
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
};

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function PostForm({ post, open, onClose }: PostFormProps) {
    const isUpdate = !!post;
    const [payload, setPayload] = useState<Post>({ title: '', content: '', tags: [] });
    const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
    const { mutate: createPost, isPending: isCreating } = useCreatePost();

    const loading = isUpdating || isCreating;

    function handleSave() {
        if (isUpdate) {
            updatePost({ post: payload }, { onSuccess });
        } else {
            createPost({ post: payload }, { onSuccess });
        }
    }

    function onSuccess() {
        onClose({ refresh: true })
    }

    function handleChange(event: any) {
        const { name, value } = event.target

        setPayload(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (isUpdate) {
            setPayload(post);
        } else {
            setPayload({ title: '', content: '', tags: [] })
        }
    }, [post])

    return <ThemeProvider theme={lightTheme}>
        <Modal open={open} onClose={onClose} hideBackdrop={true}>
            <Box sx={style}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
                    <Typography variant="h6">{isUpdate ? 'Update Post' : 'Create Post'}</Typography>
                </Box>

                {/* Content */}
                <Box display='flex' flexDirection='column' sx={{ p: 2, flexGrow: 1, gap: 5 }}>
                    <TextField fullWidth value={payload.title} onChange={handleChange} label="Title" name='title' variant="outlined" />
                    <TextField fullWidth value={payload.content} onChange={handleChange} label="Content" name='content' variant="outlined" />
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]} // No predefined options
                        value={payload.tags}
                        onChange={(event, newValue) => {
                            setPayload(prev => ({ ...prev, tags: newValue }));
                        }}
                        renderValue={(value: string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                    key={option}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Tags"
                                placeholder="Add a tag"
                            />
                        )}
                    />
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <Button loading={loading} onClick={onClose}>Cancel</Button>
                    <Button loading={loading} variant="contained" onClick={handleSave}>
                        {isUpdate ? 'Update' : 'Save'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    </ThemeProvider>
}

export default PostForm;