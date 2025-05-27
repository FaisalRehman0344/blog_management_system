
import { Button, CircularProgress, createTheme, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Pagination, Paper, Select, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import { CanAccess, PostCard } from "components";
import { ConfirmationDialog } from "components/Confirmation";
import { PostForm } from "components/PostForm";
import { useSession } from "hooks";
import { GetPostParams, useDeletePost, useGetPosts, usePublishUnpublish } from "hooks/useBlogAPIs"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "types";

function Home() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<GetPostParams>({ status: 'published' });
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationProps, setPaginationProps] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [editPost, setEditPost] = useState<Post | undefined>()
  const [deletePost, setDeletePost] = useState<Post | undefined>()
  const { mutate: getBlogs, isPending: isFetching } = useGetPosts()
  const { mutate: deleteBlog, isPending: isDeleting } = useDeletePost()
  const { mutate: publishUnpublish, isPending: isPublishUnpublish } = usePublishUnpublish();
  const { isAuthenticated } = useSession()
  const [myPostsOnly, setMyPostsOnly] = useState(isAuthenticated);

  const loading = isFetching || isDeleting || isPublishUnpublish;

  function handleChange(event: any) {
    const { name, value } = event.target

    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handlePageChange(event: any, value: number) {
    setPage(value);
  }

  function onEdit(post: Post) {
    setEditPost(post)
    setOpen(true);
  }

  function onDelete(post: Post) {
    setOpenConfirmation(true);
    setDeletePost(post);
  }

  function onPublish(post: Post) {
    publishUnpublish({ postId: post.id, status: 'published' }, {
      onSuccess: () => {
        fetchBlogs();
      }
    })
  }

  function onUnPublish(post: Post) {
    publishUnpublish({ postId: post.id, status: 'draft' }, {
      onSuccess: () => {
        fetchBlogs();
      }
    })
  }

  function fetchBlogs() {
    getBlogs({ ...filters, page, my: myPostsOnly }, {
      onSuccess: (data: any) => {
        setPage(data.page);
        setPaginationProps({ totalPages: data.totalPages });
        setPosts(data.results as Post[]);
      }
    })
  }

  function handleDelete() {
    if (deletePost && deletePost.id) {
      deleteBlog({ postId: deletePost.id }, {
        onSuccess: () => {
          fetchBlogs();
          setOpenConfirmation(false);
          setDeletePost(undefined);
        }
      })
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    if (page) {
      setPage(Number(page))
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('page') !== page.toString()) {
      params.set('page', page.toString());
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [page])

  useEffect(() => {
    fetchBlogs();
  }, [filters, myPostsOnly, page])

  return (
    <div className="p-5">
      <div className="d-flex flex-column gap-1 align-items-start p-4" style={{ backgroundColor: '#6f6f77', borderRadius: '15px' }}>
        <div className="d-flex w-100 align-items-center gap-5 ">
          <TextField fullWidth value={filters.title} onChange={handleChange} label="Title" name='title' variant="outlined" />
          <TextField fullWidth value={filters.content} onChange={handleChange} label="Content" name='content' variant="outlined" />
          <TextField fullWidth value={filters.tag} onChange={handleChange} label="Tag" name='tag' variant="outlined" />

          {isAuthenticated && <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={filters.status}
              label="Status"
              name="status"
              onChange={handleChange}
            >
              <MenuItem value='draft'>Draft</MenuItem>
              <MenuItem value='published'>Published</MenuItem>
            </Select>
          </FormControl>}
        </div>

        {isAuthenticated && <div className="d-flex align-items-end justify-content-between w-100 mt-3">
          <CanAccess roles={['admin']}>
            <FormControlLabel style={{ color: 'white' }} control={<Switch value={myPostsOnly} defaultChecked onChange={(event) => setMyPostsOnly(event.target.checked)} name="my" />} label="My Posts Only" />
          </CanAccess>
          <CanAccess roles={['admin', 'author']}>
            <Button onClick={() => setOpen(true)} variant="contained" color="primary" style={{ padding: '.5rem 1.5rem' }}>Create Post</Button>
          </CanAccess>
        </div>}
      </div>

      {!loading && <Grid container spacing={2}>
        {posts.map((post) => {
          return <PostCard {...post} status={post.status!} onEdit={() => onEdit(post)} onDelete={() => onDelete(post)} onPublish={() => onPublish(post)} onUnpublish={() => onUnPublish(post)} />
        })}
      </Grid>}

      <PostForm post={editPost} open={open} onClose={({ refresh }: { refresh: boolean }) => {
        setEditPost(undefined);
        setOpen(false);
        if (refresh) {
          fetchBlogs();
        }
      }} />

      <ConfirmationDialog open={openConfirmation} onClose={() => {
        setDeletePost(undefined);
        setOpenConfirmation(false);
      }} onConfirm={handleDelete} />

      {!loading && <div className="w-100 d-flex justify-content-end">
        <ThemeProvider theme={lightTheme}>
          <Pagination count={paginationProps.totalPages} color="primary" page={page} onChange={handlePageChange} />
        </ThemeProvider>
      </div>}

      {loading && <div className="d-center h-screen-full">
        <CircularProgress />
      </div>}
    </div>
  )
}

export default Home
