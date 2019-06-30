import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Load styles
import '../../style/components/live.scss';
import '../../style/components/card.scss';

const { useState, useRef } = React;

export const LiveScreen = (props: any) => {
  return (
    <>
      <div className="c-live-image">

      </div>
      <div className="c-card">
        <Card>
          <CardContent className="c-card__body">
            <Typography className="c-card__title" color="textSecondary" gutterBottom>
              Temp.
            </Typography>
            <Typography className="c-card__value" variant="h5" component="h5">
              23.0 ℃
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="c-card">
        <Card>
          <CardContent className="c-card__body">
            <Typography className="c-card__title" color="textSecondary" gutterBottom>
              Humidity
            </Typography>
            <Typography className="c-card__value" variant="h5" component="h5">
              50%
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="c-card">
        <Card>
          <CardContent className="c-card__body">
            <Typography className="c-card__title" color="textSecondary" gutterBottom>
              Pressure
            </Typography>
            <Typography className="c-card__value" variant="h5" component="h5">
              1,000 Pa (Low)
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="c-card">
        <Card>
          <CardContent className="c-card__body">
            <Typography className="c-card__title" color="textSecondary" gutterBottom>
              CPU Temp.
            </Typography>
            <Typography className="c-card__value" variant="h5" component="h5">
              65.3 ℃
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
