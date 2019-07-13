import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as API from '@util/API';

// Load styles
import '../../style/components/live.scss';
import '../../style/components/card.scss';

const { useState, useRef, useEffect } = React;

export const LiveScreen = (props: any) => {
  const ws = new WebSocket(API.camera());
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = (canvasRef.current as any).getContext('2d');

    ws.addEventListener('error', (e) => {
      console.log('An error occurred.');
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
