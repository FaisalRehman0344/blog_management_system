import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";


function DeleteConfirmation({ open, onClose, onConfirm }: { open: boolean, onClose: any, onConfirm: any }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this post?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmation;