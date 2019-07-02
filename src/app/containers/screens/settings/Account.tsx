import {LiveStreaming} from "./LiveStreaming";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";

export const Account = (props: any) => {
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          Account
        </ListSubheader>
      }
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
  );
}
