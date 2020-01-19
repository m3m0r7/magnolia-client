import * as React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
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
import {Icon} from "@material-ui/core";
import * as Action from "@actions/Action";
import {ADD_FAVORITE, UPDATE_PAGE_TITLE} from "@actions/Types";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
  const dispatch = useDispatch();
  const defaultWidth = 600 * 1.5;
  const defaultHeight = 450 * 1.5;

  const [ cookies, setCookie, removeCookie ] = useCookies();
  const canvasRef = useRef(null);

  const [ renderingType, setRenderingType ] = useState(renderingTypeEnum.STATIC);
  const [ updatedAt, setUpdatedAt ] = useState('...');
  const [ remainingValue, setRemainingValue ] = useState(0);
  const [ nextUpdate, setNextUpdate ] = useState(0);
  const [ updateInterval, setUpdateInterval ] = useState(0);
  const [ isReconnecting, setIsReconnecting ] = useState(false);
  const [ isExpandedMode, setIsExpandedMode ] = useState(false);
  const [open, setOpen] = useState(false);

  const selector = useSelector((state: any) => state);

  if (selector.setting.isEnabledLiveStreaming === null) {
    selector.setting.isEnabledLiveStreaming = !!(cookies.isEnabledLiveStreaming * 1);
  }

  if (selector.setting.isRetryConnectionEnabled === null) {
    selector.setting.isRetryConnectionEnabled = !!(cookies.isRetryConnectionEnabled * 1);
  }

  const favoriteScreen = (): void => {
    let parameter = '';
    if (renderingType === renderingTypeEnum.STATIC) {
      parameter += '?mode=static';
    }
    API.call(`/api/v1/favorite${parameter}`, 'POST')
      .then((response: any) => {
        return response.json()
      })
      .then((json: any) => {
        dispatch(
          Action.Info(ADD_FAVORITE)
        );
        setOpen(true);
      });
  };

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
      const reconnectingTimer = setTimeout(
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
      // Remove event listener for stopping to retry connection.
      ws.removeEventListener('close', retryingConnection);

      // close WebSocketConnection.
      ws.close();
    };
  };

  useEffect(
    () => {
      dispatch(
        Action.Page(
          UPDATE_PAGE_TITLE,
          {
            title: "Live Streaming",
          }
        )
      );

      const currentCanvasRef = (canvasRef.current as any);
      const ctx = currentCanvasRef.getContext('2d');

      const targetedContextWidth = parseInt(currentCanvasRef.getAttribute('width'));
      const targetedContextHeight = parseInt(currentCanvasRef.getAttribute('height'));

      ctx.scale(
        targetedContextWidth / defaultWidth,
        targetedContextHeight / defaultHeight
      );

      // High-speed internet
      if (selector.setting.isEnabledLiveStreaming) {
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
              }, 10000);
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
    [
      isExpandedMode,
    ]
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Success to favorite💗"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      {
        isExpandedMode
          ? <div className="c-expanded-container">
              <div className="c-expanded-container__inner">
                <div className="c-live-image">
                  <div className={`c-live-image-canvas-body ${isReconnecting ? 'blur' : ''}`}>
                    <canvas ref={canvasRef} width={defaultWidth} height={defaultHeight} />
                  </div>
                  <div className="c-live-header-container">
                    {isReconnecting ? 'Reconnecting...' : updatedAt}
                  </div>
                  <div className="c-live-footer-container">
                    <div className="c-live-container-body">
                      <div className="c-live-container-body__icon c-live-container__icon--favorite" onClick={() => favoriteScreen()}><Icon>favorite</Icon></div>
                      <div className="c-live-container-body__icon c-live-container__icon--aspect-ratio" onClick={() => setIsExpandedMode(false)}><Icon>zoom_out</Icon></div>
                    </div>
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
            </div>
          : <div className="c-live-image-container">
            <div className="c-live-image">
              <div className={`c-live-image-canvas-body ${isReconnecting ? 'blur' : ''}`}>
                <canvas ref={canvasRef} width={defaultWidth / 1.5} height={defaultHeight / 1.5} />
              </div>
              <div className="c-live-header-container">
                {isReconnecting ? 'Reconnecting...' : updatedAt}
              </div>
              <div className="c-live-footer-container">
                <div className="c-live-container-body">
                  <div className="c-live-container-body__icon c-live-container__icon--favorite" onClick={() => favoriteScreen()}><Icon>favorite</Icon></div>
                  <div className="c-live-container-body__icon c-live-container__icon--aspect-ratio" onClick={() => setIsExpandedMode(true)}><Icon>zoom_in</Icon></div>
                </div>
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
      }
    </>
  );
};
