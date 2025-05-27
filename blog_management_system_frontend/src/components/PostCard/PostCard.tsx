import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'hooks';

interface PostProps {
  title: string;
  content: string;
  tags: string[];
  status: string;
  imageUrl?: string;
  onEdit: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
}

const PostCard: React.FC<PostProps> = ({
  title,
  content,
  tags,
  status,
  imageUrl,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish
}) => {

  const { isAuthenticated } = useSession();

  return (
    <Card sx={{ minWidth: 350, maxWidth: 350, m: 2, p: 2, borderRadius: '15px', backgroundColor: '#6f6f77' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || 'https://t4.ftcdn.net/jpg/01/83/10/47/360_F_183104705_A47H3paOJilnGCbz0XYrvuSiVcYLCcOC.jpg'}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap textOverflow='ellipsis'>{title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom noWrap textOverflow='ellipsis'>
          {content}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
      {isAuthenticated && <CardActions>
        <Button size="small" color="primary" startIcon={<EditIcon />} onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
        {status === 'draft' && <Button size="small" color="primary" startIcon={<PublishIcon />} onClick={onPublish}>
          Publish
        </Button>}
        {status === 'published' && <Button size="small" color="error" startIcon={<UnpublishedIcon />} onClick={onUnpublish}>
          Unpublish
        </Button>}
      </CardActions>}
    </Card>
  );
};

export default PostCard;
