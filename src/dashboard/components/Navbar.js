import React from 'react';
import { List, ListItemIcon, ListItem, ListItemText } from 'material-ui';
import { Link } from 'react-router-dom';
import SendIcon from 'material-ui-icons/Send';
import GroupIcon from 'material-ui-icons/Group';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';
import EqualizerIcon from 'material-ui-icons/Equalizer';


export const Navbar = () => {
  return (
    <nav className="navbar">
      <List>
        <ListItem button>
          <Link to="/dashboard">
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Pulpit" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/dashboard/users">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Użytkownicy" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/dashboard/payments">
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Lista wpłat" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/dashboard/messages">
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Wiadomości" />
          </Link>
        </ListItem>
      </List>
    </nav>
  );
};

Navbar.propTypes = {

};

export default Navbar;
