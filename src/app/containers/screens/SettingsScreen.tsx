import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

const { useState, useRef } = React;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export const SettingsScreen = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Device
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Icon>info</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Information"
            secondary="Show device information."
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>whatshot</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Temperature"
                secondary="24.5℃"
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>scatter_plot</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Humidity"
                secondary="75%"
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>waves</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Pressure"
                secondary="1000 Pa"
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>memory</Icon>
              </ListItemIcon>
              <ListItemText
                primary="CPU Temperature"
                secondary="60.3℃"
              />
            </ListItem>

          </List>
        </Collapse>
        <ListItem button>
          <ListItemIcon>
            <Icon>help</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Help"
            secondary="Show help"
          />
        </ListItem>
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Live Streaming
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem>
          <ListItemIcon>
            <Icon>wifi</Icon>
          </ListItemIcon>
          <ListItemText
            primary="WIFI only"
            secondary="Live streaming connect to server Wifi only. otherwise, get static image every 30sec."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={() => true}
              checked={true}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>refresh</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Retry connection"
            secondary="The application retry connection if disconnected from server."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={() => true}
              checked={true}
              inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Account
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <Icon>power_settings_new</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Sign out"
            secondary="Sign out from the application."
          />
        </ListItem>
      </List>
    </>
  );
};
