import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

const UserMenu = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSignOut = () => {
        setAnchorEl(null);
        props.signOut();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <React.Fragment>
        <Button
            id="user-button"
            aria-controls="user-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            {props.userName}
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Menu>
    </React.Fragment> 
}

export default UserMenu;