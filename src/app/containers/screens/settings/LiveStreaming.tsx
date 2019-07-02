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
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../../actions/Action';
import * as Types from '../../../actions/Types';

const { useState } = React;

export const LiveStreaming = (props: any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);
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
              onChange={() => {
                dispatch(
                  Action.Setting(
                    selector.setting.isWifiOnlyEnabled
                      ? Types.OFF_SETTING_WIFI_ONLY
                      : Types.ON_SETTING_WIFI_ONLY
                  )
                )
              }}
              checked={selector.setting.isWifiOnlyEnabled}
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
              onChange={() => {
                dispatch(
                  Action.Setting(
                    selector.setting.isRetryConnectionEnabled
                      ? Types.OFF_SETTING_RETRY_CONNECTION
                      : Types.ON_SETTING_RETRY_CONNECTION
                  )
                )
              }}
              checked={selector.setting.isRetryConnectionEnabled}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
}
