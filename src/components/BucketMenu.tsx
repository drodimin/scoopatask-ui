import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BucketMenu = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = () => {
        setAnchorEl(null);
        props.delete();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <React.Fragment>
        <IconButton
            id="bucket-menu-button"
            aria-controls="bucket-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="bucket-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'bucket-menu-button',
            }}>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
    </React.Fragment> 
}

export default BucketMenu;