import * as React from 'react';
import { Device } from './settings/Device';
import { LiveStreaming } from './settings/LiveStreaming';
import { Account } from './settings/Account';

const { useState, useRef, useEffect } = React;

export const SettingsScreen = (props: any) => {
  return (
    <>
      <Device />
      <LiveStreaming />
      <Account />
    </>
  );
};
