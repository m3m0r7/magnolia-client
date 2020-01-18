import * as React from 'react';
import {connect, useDispatch} from 'react-redux'
import * as Action from "@actions/Action";
import {UPDATE_PAGE_TITLE} from "@actions/Types";

const { useState, useRef, useEffect } = React;

export const HistoriesScreen = (props: any) => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(
        Action.Page(
          UPDATE_PAGE_TITLE,
          {
            title: "Histories",
          }
        )
      );
    },
    []
  );
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <p style={{fontSize: '12px', color: '#888888'}}>
          This content is not available.
        </p>
      </div>
    </>
  );
};
