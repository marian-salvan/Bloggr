import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import { Box, ListItem, ListItemText } from '@material-ui/core';
import { Routes } from '../../common/Routes';
import { Constants } from '../../common/Constants';
import { AccountCircle } from '@material-ui/icons';
import { useStyles } from './AppHeader.styles';
import AccountMenu from '../AccountMenu/AccountMenu';
import DrawerMenu from '../DrawerMenu/DrawerMenu';

const AppHeader: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerState, setDrawerState] = React.useState<boolean>(false);

  const menuId = 'primary-search-account-menu';

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const changeDrawerState = (open: boolean) => {
    setDrawerState(open);
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => { setDrawerState(true); }}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {Constants.appName}
          </Typography>
          <Box className={classes.mainMenu}>
            <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
              {Routes.map(({ title, path }) => (
                <ListItem button key={title} component={NavLink} to={path} activeClassName={classes.activeRoute}>
                  <ListItemText>{title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
          <div className={classes.grow} />
          <div className={classes.rightMenu}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountMenu menuId={menuId} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
      <DrawerMenu drawerState={drawerState} setDrawerState={changeDrawerState} />
    </div >
  );
}

export default AppHeader;