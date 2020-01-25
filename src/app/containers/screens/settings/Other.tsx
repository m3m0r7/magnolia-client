import {LiveStreaming} from "./LiveStreaming";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as API from "@util/API";
import * as Action from "@actions/Action";
import {useDispatch} from "react-redux";
import {LOGOUT} from "@actions/Types";

// Load components
import { history } from '@stores/configureStore';

export const Other = (props: any) => {

  const downloadAll = () => {
    window.open(
      API.path() + "/api/v1/download"
    )
  }

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Other
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => downloadAll()}>
          <ListItemIcon>
            <Icon>import_export</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Export favorites"
            secondary="Export favorites you saved"
          />
        </ListItem>
      </List>
    </>
  );
}
