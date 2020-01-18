import * as React from 'react';
import { Device } from './settings/Device';
import { LiveStreaming } from './settings/LiveStreaming';
import { Account } from './settings/Account';
import { useCookies } from 'react-cookie';
import * as Action from "@actions/Action";
import {UPDATE_PAGE_TITLE} from "@actions/Types";
import {useDispatch} from "react-redux";

const { useState, useRef, useEffect } = React;

export const SettingsScreen = (props: any) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(
        Action.Page(
          UPDATE_PAGE_TITLE,
          {
            title: "Settings",
          }
        )
      );
    },
    []
  );
  return (
    <>
      <Device />
      <LiveStreaming />
      <Account />
    </>
  );
};
