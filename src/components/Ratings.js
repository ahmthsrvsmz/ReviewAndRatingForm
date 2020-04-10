import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const Ratings = ({ average }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="headerRating">
        <Rating
          name="half-rating-read"
          value={average}
          precision={0.5}
          number={average}
          readOnly
        />
        <p>{average}</p>
      </div>
    </div>
  );
};

export default Ratings;
