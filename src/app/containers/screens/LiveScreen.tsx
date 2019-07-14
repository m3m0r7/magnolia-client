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

const updateStaticImage = (): void => {
  API
    .call('/api/v1/capture')
    .then((response: any) => {
      return response.json()
    })
    .then((json: any) => {
      console.log(json);
    });
};

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
    if (
      !selector.setting.isEnabledLiveStreaming ||
      navigator.connection.downlink > LiveStreamingEnv.HIGH_SPEED_INTERNET_BOUNDARY_VALUE
    ) {
      const ws = new WebSocket(API.camera());
      const retryingConnection = (e: any) => {

      };

      ws.addEventListener('close', retryingConnection);
      ws.addEventListener('error', retryingConnection);

      ws.addEventListener('message', (e) => {
        const image = new Image();
        image.src = e.data;
        ctx.drawImage(
          image,
          0,
          0
        );
      });

      return () => {
        ws.close();
      };
    }

    // Slow internet (for cellular)
    const getImage = setTimeout(() => {}, 0);

    return () => {

    };
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
