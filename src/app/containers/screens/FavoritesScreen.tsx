import * as React from 'react';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";

const { useState, useEffect } = React;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      maxWidth: '100%',
      margin: '0 !important'
    },
  }),
);

export const FavoritesScreen = (props: any) => {
  const classes = useStyles();

  const [ images, setImages ] = useState({});
  const [ listOpenedInfo, setListOpenedInfo ] = useState([false]);

  useEffect(() => {
    if (Object.keys(images).length > 0) {
      return;
    }
    fetch('/api/v1/image')
      .then((response: any) => {
        return response.json()
      })
      .then((json: any) => {
        setImages(json);
      });
  });

  function toggleOpenedInfo(index: number) {
    setListOpenedInfo(
      listOpenedInfo.map(
        (value: boolean, key: number) => {
          return (index == key) ? !value : value
        }
      ) as []
    );
  }

  return (
    <>
      {
        Object.keys(images).map((date) => {
          const items: [] = images[date];
          return (
            <List
              key={date}
              component="div"
              style={{paddingTop: 0}}
              className={classes.root}
            >
              <ListItem
                button
                onClick={() => toggleOpenedInfo(0)}
              >
                <ListItemText
                  primary={date}
                  secondary={`${items.length} photos`}
                />
                {listOpenedInfo[0] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={listOpenedInfo[0]} timeout="auto" unmountOnExit>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                  {(items.map((image: any, key) => (
                    <GridListTile key={key} cols={1}>
                      <img src={image.src} />
                    </GridListTile>
                  ))}
                </GridList>
              </Collapse>
            </List>
          );
        })
      }
    </>
  );
};
