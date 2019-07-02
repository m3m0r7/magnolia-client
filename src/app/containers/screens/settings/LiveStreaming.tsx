import {Device} from "./Device";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import * as React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const LiveStreaming = (props: any) => {
  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Live Streaming
          </ListSubheader>
        }
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
              onChange={() => {}}
              checked={true}
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
              onChange={() => {}}
              checked={true}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
}
