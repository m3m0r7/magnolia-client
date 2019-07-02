import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import * as React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

export const Device = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
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
          secondary="Show help."
        />
      </ListItem>
    </List>
  );
}
