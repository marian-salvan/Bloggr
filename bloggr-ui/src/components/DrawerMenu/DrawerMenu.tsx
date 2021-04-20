import React from 'react';
import DrawerMenuProps from './DrawerMenu.props';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useStyles } from './DrawerMenu.styles';
import { routes } from '../../utils/Routes';
import { Link } from 'react-router-dom';

const DrawerMenu: React.FC<DrawerMenuProps> = ({ drawerState, setDrawerState }) => {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {routes.map((route, index) => (
          <ListItem button key={route.title} component={Link} to={route.path}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText>
              {route.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={'left'}
        open={drawerState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerMenu;