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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

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
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openVersion, setOpenVersion] = React.useState(false);

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

        <ListItem button onClick={() => setOpenInfo(!openInfo)}>
          <ListItemIcon>
            <Icon>info</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Information"
            secondary="Show device information."
          />
          {openInfo ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openInfo} timeout="auto" unmountOnExit>
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
        <ListItem button onClick={() => setOpenVersion(!openVersion)}>
          <ListItemIcon>
            <Icon>build</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Version"
            secondary="Show system versions."
          />
          {openVersion ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openVersion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>computer</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Device Version"
                secondary="v1.0.0 / Magnolia / Raspbian"
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>web_asset</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Application Version"
                secondary="v1.0.0 / Manolia"
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <Icon>cast</Icon>
              </ListItemIcon>
              <ListItemText
                primary="Live Streaming Server Version"
                secondary="v1.0.0 / Magnolia"
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  );
}
