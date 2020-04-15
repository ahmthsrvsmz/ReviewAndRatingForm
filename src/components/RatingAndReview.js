import React, { useState } from "react";
import logo from "../logo.svg";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
      textAlign: "center",
    },
  },
}));

const boolean = true;

function RatingAndReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [allRatings, setAllRatings] = useState([]);
  const [allRatingsReviews, setAllRatingsReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [trigger, setTrigger] = useState(false);
  const [triggerReview, setTriggerReview] = useState(false);
  const [triggerRating, setTriggerRating] = useState(false);

  const classes = useStyles();

  const calculateTotal = (total, num) => total + num;

  function handleChangeRating(e) {
    setDate(new Date());
    e.preventDefault();
    setRating(Number(e.target.value));
    calculateAverage();
    setTrigger(false);
    // console.log(rating);
  }

  function handleChangeReview(e) {
    e.preventDefault();
    setReview(e.target.value);
    calculateAverage();
    setTrigger(false);
    // console.log(review);
  }

  function handleSubmit() {
    if (review.length < 5 || review.length > 160) {
      setTriggerReview(true);
      setTriggerRating(false);
    } else if (Number(rating) === 0) {
      setTriggerRating(true);
      setTriggerReview(false);
    } else {
      setAllRatings([Number(rating), ...allRatings]);

      setAllRatingsReviews([
        { date: date.toLocaleString(), rating: rating, review: review },
        ...allRatingsReviews,
      ]);
      setRating(0);
      setTriggerRating(false);
      setTriggerReview(false);
      setReview("");
      setTrigger(true);
      calculateAverage();
    }
  }
  console.log(allRatings);

  const calculateAverage = () => {
    let total = allRatings.reduce(calculateTotal, 0);
    if (allRatingsReviews.length > 0) {
      setAverage(total / allRatings.length);
    }
  };

  return (
    <div>
      <header className="App-header">
        <div className="logo-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Rate & Review React</p>
          <div>
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
        </div>
      </header>

      <div className="ratingReview">
        <div className="rating">
          <Rating
            name="half-rating"
            defaultValue={0}
            value={rating}
            precision={0.5}
            onChange={handleChangeRating}
          />
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <div className="review">
            <div className="textField">
              <TextField
                id="outlined-basic"
                label="Review (Max 160 - Min 5 Character)"
                variant="outlined"
                fullWidth={boolean}
                value={review}
                onChange={handleChangeReview}
              />
            </div>
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                fullWidth={boolean}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>

        {triggerRating === true ? (
          <p className="trigger"> Please rate us </p>
        ) : null}

        {triggerReview === true ? (
          <p className="trigger"> Please comment below (5-160 characters) </p>
        ) : null}

        {trigger === true ? (
          <p className="trigger">Thank you for your comment and rating</p>
        ) : null}
      </div>
      <div className="allComments">
        <p>{allRatingsReviews.length > 0 ? "Costumer Reviews" : null}</p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {allRatingsReviews.map((obj, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {obj.date}
                    </TableCell>
                    <TableCell align="left">
                      <Rating
                        name="half-rating-read"
                        value={obj.rating}
                        precision={0.5}
                        readOnly
                      />
                    </TableCell>
                    <TableCell align="left">{obj.review}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default RatingAndReview;
