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

export const Account = (props: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const logoutAction = () => {
      API.call(
          '/api/v1/signout',
          'POST'
      )
        .then((response: any) => {
          return response.json()
        })
        .then((json: any) => {
          dispatch(
            Action.Login(
              LOGOUT
            )
          )
          history.push(
            "/"
          )
        });
  };

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            Account
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <Icon>power_settings_new</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Sign out"
            secondary="Sign out from the application."
          />
        </ListItem>
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to sign out from this application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {setOpen(false); logoutAction()}} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
