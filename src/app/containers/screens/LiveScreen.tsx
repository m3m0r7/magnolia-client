import * as React from 'react';
import {connect, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as API from '@util/API';

import * as LiveStreamingEnv from '@envs/LiveStreaming';

// Load styles
import '@style/components/live.scss';
import '@style/components/card.scss';
import { useCookies } from "react-cookie";

const { useState, useRef, useEffect } = React;

interface Navigator {
  connection: any;
}
declare let navigator: Navigator;

export const LiveScreen = (props: any) => {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const canvasRef = useRef(null);

  const selector = useSelector((state: any) => state);

  if (selector.setting.isEnabledLiveStreaming === null) {
    selector.setting.isEnabledLiveStreaming = !!(cookies.isEnabledLiveStreaming * 1);
  }

  if (selector.setting.isRetryConnectionEnabled === null) {
    selector.setting.isRetryConnectionEnabled = !!(cookies.isRetryConnectionEnabled * 1);
  }

  useEffect(() => {
    const ctx = (canvasRef.current as any).getContext('2d');

    // High-speed internet
    if (navigator.connection.downlink > LiveStreamingEnv.HIGH_SPEED_INTERNET_BOUNDARY_VALUE) {
      const ws = new WebSocket(API.camera());

      ws.addEventListener('error', (e) => {
        console.log('An error occurred.');

        // TODO: connect retrying.
      });

      ws.addEventListener('message', (e) => {
        const image = new Image();
        image.src = e.data;
        ctx.drawImage(
          image,
          0,
          0
        );
      });
      return;
    }

    // Slow internet (for cellular)


  });

  return (
    <>
      <div className="c-live-image-container">
        <div className="c-live-image">
          <canvas ref={canvasRef} width="600" height="450">

          </canvas>
        </div>
      </div>
    </>
  );
};
