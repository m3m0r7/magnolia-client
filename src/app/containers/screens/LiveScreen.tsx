import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as API from '@util/API';

// Load styles
import '../../style/components/live.scss';
import '../../style/components/card.scss';

const { useState, useRef } = React;

export const LiveScreen = (props: any) => {
  return (
    <>
      <div className="c-live-image-container">
        <div className="c-live-image">
          <img src={API.camera()} className="c-live-image-body" />
        </div>
      </div>
    </>
  );
};
