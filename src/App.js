import React, { useState } from "react";
import logo from "./logo.svg";
import Ratings from "./components/Ratings";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Review from "./components/Review";

import "./App.css";

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

function App() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [allRatings, setAllRatings] = useState([]);
  const [allRatingsReviews, setAllRatingsReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [trigger, setTrigger] = useState(false);

  const classes = useStyles();

  let today = date;
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let curHour =
    today.getHours() > 12
      ? today.getHours() - 12
      : today.getHours() < 10
      ? "0" + today.getHours()
      : today.getHours();
  let curMinute =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  let curSeconds =
    today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
  today =
    mm +
    "/" +
    dd +
    "/" +
    yyyy +
    " (" +
    curHour +
    ":" +
    curMinute +
    ":" +
    curSeconds +
    ")";

  const calculateTotal = (total, num) => total + num;

  function handleChangeRating(e) {
    setDate(new Date());
    e.preventDefault();
    setRating(e.target.value);
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
      alert("Please comment below");
    } else if (Number(rating) === 0) {
      alert("Please rate us");
    } else {
      setAllRatings([Number(rating), ...allRatings]);

      setAllRatingsReviews([
        { date: today, rating: rating, review: review },
        ...allRatingsReviews,
      ]);
      setRating(0);
      setReview("");
      calculateAverage();
      setTrigger(true);
    }
  }

  const calculateAverage = () => {
    let total = allRatings.reduce(calculateTotal, 0);
    if (allRatingsReviews.length > 0) {
      setAverage(total / allRatings.length);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Rate & Review React</p>
          <Ratings average={average.toFixed(1)} />
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
                fullWidth="true"
                value={review}
                onChange={handleChangeReview}
              />
            </div>
            <div className="button">
              <Button
                variant="contained"
                color="primary"
                fullWidth="true"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
        {trigger === true ? (
          <p className="trigger">Thank you for your comment and rating</p>
        ) : null}
      </div>
      <div className="allComments">
        <p>{allRatingsReviews.length > 0 ? "Costumer Reviews" : null}</p>
        <Review allRatingsReviews={allRatingsReviews} />
      </div>
    </div>
  );
}

export default App;
