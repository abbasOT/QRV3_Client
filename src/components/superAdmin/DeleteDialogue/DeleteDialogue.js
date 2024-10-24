import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide, Box } from '@mui/material';
import WarningIcon from "../../../assests/superAdmin/warningIcon.svg"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialogue({ handleDeleteOpen, handleDeleteClose, handleDelete }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        handleDeleteOpen();
        setOpen(true);
    };

    const handleClickClose = () => {
        handleDeleteClose();
        setOpen(false);
    };

    const handleConfirm = () => {
        handleDelete()
        handleClickClose()
    }

    return (
        <>

            <Dialog
                open={handleClickOpen}
                onClose={handleClickClose}
                PaperProps={{
                    sx: { ...themeStyle.paperPropsStyle },
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%", }}>
                    <Box component="img" sx={{ textAlign: "center" }} src={WarningIcon} width={38} />
                </Box>
                <DialogTitle sx={themeStyle.textStyle}>Are you sure ?</DialogTitle>
                <DialogActions>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "-1rem", }}>
                        <Button sx={{ ...themeStyle.actionButtonStyle, background: "", color: '#C24E42', border: "1px solid #E4E4E4" }} onClick={handleConfirm}>Yes</Button>
                        <Button sx={themeStyle.actionButtonStyle} onClick={handleClickClose}>No</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );

}
const themeStyle = {
    actionButtonStyle: {
        background: '#C24E42', color: "#FFFFFF", textTransform: "none", fontFamily: 'var(--font-family-primary)', fontWeight: 500, marginTop: "1rem", fontSize: "0.9rem", padding: "0.5rem 2rem", borderRadius: "0.3rem",
        '&:hover': {
            background: 'gray',
            color: "#FFF"
        },
        width: "100%"
    },
    paperPropsStyle: {
        background: "#FFF",
        width: "auto",
        minWidth: "20%",
        padding: "2rem 1.5rem 0.5rem 1.5rem",

    },
    textStyle: {
        fontFamily: 'var(--font-family-primary)',
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1rem",
        color: "#C24E42"
    },
}
export default DeleteDialogue