import * as React from 'react';
import {connect, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as API from '@util/API';
import LinearProgress from '@material-ui/core/LinearProgress';

import * as LiveStreamingEnv from '@envs/LiveStreaming';
import moment from 'moment';

// Load styles
import '@style/components/live.scss';
import '@style/components/card.scss';
import { useCookies } from "react-cookie";
import Timeout = NodeJS.Timeout;

const { useState, useRef, useEffect } = React;

interface Navigator {
  connection: any;
}
declare let navigator: Navigator;

enum renderingTypeEnum {
  LIVE,
  STATIC,
}

export const LiveScreen = (props: any) => {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const canvasRef = useRef(null);

  const [ renderingType, setRenderingType ] = useState(renderingTypeEnum.STATIC);
  const [ updatedAt, setUpdatedAt ] = useState('...');
  const [ remainingValue, setRemainingValue ] = useState(0);
  const [ nextUpdate, setNextUpdate ] = useState(0);
  const [ updateInterval, setUpdateInterval ] = useState(0);
  const [ isReconnecting, setIsReconnecting ] = useState(false);

  const selector = useSelector((state: any) => state);

  if (selector.setting.isEnabledLiveStreaming === null) {
    selector.setting.isEnabledLiveStreaming = !!(cookies.isEnabledLiveStreaming * 1);
  }

  if (selector.setting.isRetryConnectionEnabled === null) {
    selector.setting.isRetryConnectionEnabled = !!(cookies.isRetryConnectionEnabled * 1);
  }

  useEffect(
    () => {
      if (renderingType !== renderingTypeEnum.LIVE) {
        return;
      }
      const update = () => {
        setUpdatedAt(
          moment(moment().unix() * 1000)
            .format('YYYY/MM/DD HH:mm:ss (ddd)')
        );
      };

      const timerId = setInterval(() => update(), 1000);
      update();

      return () => {
        clearInterval(timerId);
      };
    },
    [
      renderingType
    ]
  );

  useEffect(
    () => {
      if (renderingType !== renderingTypeEnum.STATIC) {
        return;
      }
      const remainingTimer = setInterval(
        () => {
          let remainingTimes = nextUpdate - moment().unix();
          if (remainingTimes < 0) {
            remainingTimes = 0;
          }
          setRemainingValue(100 - ((remainingTimes / updateInterval) * 100));
        },
        500
      );
      return () => {
        clearInterval(remainingTimer);
      }
    },
    [
      updateInterval,
      nextUpdate,
    ]
  );

  const connectWebSocketServer = (ctx: any) => {
    let ws = new WebSocket(API.camera());
    const retryingConnection = (e: any) => {
      setIsReconnecting(true);

      // reconnecting
      setTimeout(
        () => {
          connectWebSocketServer(ctx);
        },
        5000
      );
    };

    ws.addEventListener('open', () => {
      // if connect to server successfully, the reconnecting status get to disable.
      setIsReconnecting(false);
    });
    ws.addEventListener('close', retryingConnection);
    // ws.addEventListener('error', retryingConnection);

    ws.addEventListener('message', (e) => {
      const image = new Image();
      image.src = e.data;
      image.onload = () => {
        ctx.drawImage(
          image,
          0,
          0
        );
      }
    });

    return () => {
      ws.close();
    };
  };

  useEffect(
    () => {
      const ctx = (canvasRef.current as any).getContext('2d');
      // High-speed internet
      if (
        !selector.setting.isEnabledLiveStreaming ||
        navigator.connection.downlink > LiveStreamingEnv.HIGH_SPEED_INTERNET_BOUNDARY_VALUE
      ) {
        setRenderingType(renderingTypeEnum.LIVE);
        return connectWebSocketServer(ctx);
      }

      // Slow internet (for cellular)

      setRenderingType(renderingTypeEnum.STATIC);

      let timeId: number | Timeout | undefined = undefined;
      const updateStaticImage = (): void => {
        API
          .call('/api/v1/capture')
          .then((response: any) => {
            return response.json()
          })
          .then((json: any) => {
            setIsReconnecting(false);
            setUpdateInterval(json.update_interval);
            let remainingTimes = json.next_update - moment().unix();
            if (remainingTimes < 0) {
              remainingTimes = 0;
            }

            const image = new Image();
            image.src = json.image;
            image.onload = () => {
              ctx.drawImage(
                image,
                0,
                0,
              );
            };

            if (remainingTimes <= 0 || json.next_update < moment().unix()) {
              // In this statement, Camera server has been dead.
              setIsReconnecting(true);

              // wait 5 sec
              const reconnectingTimer = setTimeout(() => {
                clearTimeout(reconnectingTimer);
                updateStaticImage()
              }, 5000);
              return;
            }

            setRemainingValue(
              100 - ((remainingTimes / json.update_interval) * 100)
            );
            setNextUpdate(json.next_update);
            setUpdatedAt(
              moment(json.updated_at * 1000)
                .format('YYYY/MM/DD HH:mm:ss (ddd)')
            );

            timeId = setTimeout(
            () => {
                clearTimeout(timeId as number);
                updateStaticImage();
              },
              remainingTimes * 1000
            );
        });
      };

      updateStaticImage();

      return () => {
        if (timeId !== undefined) {
          clearTimeout(timeId as number);
        }
      };
    },
    []
  );

  return (
    <>
      <div className="c-live-image-container">
        <div className="c-live-image">
          <div className={`c-live-image-canvas-body ${isReconnecting ? 'blur' : ''}`}>
            <canvas ref={canvasRef} width="600" height="450" />
          </div>
          <div className="c-live-control-container">
            {isReconnecting ? 'Reconnecting...' : updatedAt}
          </div>
          {
            renderingType == renderingTypeEnum.STATIC &&
              <>
                <LinearProgress
                  className="c-live-remaining-bar"
                  variant="determinate"
                  value={remainingValue}
                />
              </>
          }
        </div>
      </div>
    </>
  );
};
