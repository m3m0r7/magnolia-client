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
import { useCookies } from "react-cookie";

const { useState, useEffect } = React;

export const LiveStreaming = (props: any) => {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state);

  if (selector.setting.isEnabledLiveStreaming === null) {
    selector.setting.isEnabledLiveStreaming = !!(cookies.isEnabledLiveStreaming * 1);
  }

  if (selector.setting.isRetryConnectionEnabled === null) {
    selector.setting.isRetryConnectionEnabled = !!(cookies.isRetryConnectionEnabled * 1);
  }

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
            primary="High-speed connection only"
            secondary="Live streaming get to enable if your internet is high-speed. otherwise, get static image every 30sec."
          />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={() => {
                setCookie('isEnabledLiveStreaming', !selector.setting.isEnabledLiveStreaming ? 1 : 0);
                dispatch(
                  Action.Setting(
                    selector.setting.isEnabledLiveStreaming
                      ? Types.OFF_SETTING_WIFI_ONLY
                      : Types.ON_SETTING_WIFI_ONLY
                  )
                )
              }}
              checked={selector.setting.isEnabledLiveStreaming}
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
                setCookie('isRetryConnectionEnabled', !selector.setting.isRetryConnectionEnabled ? 1 : 0);
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
