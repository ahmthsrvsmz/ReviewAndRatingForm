import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReviewForm from "./ReviewForm";

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

function ReviewList() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [author, setAuthor] = useState("");
  const [allRatings, setAllRatings] = useState([]);
  const [allRatingsReviews, setAllRatingsReviews] = useState([]);
  const [date, setDate] = useState(new Date());
  const [trigger, setTrigger] = useState(false);
  const [triggerReview, setTriggerReview] = useState(false);
  const [triggerRating, setTriggerRating] = useState(false);

  const classes = useStyles();

  function handleChangeRating(e) {
    setDate(new Date());
    e.preventDefault();
    setRating(Number(e.target.value));
    setTrigger(false);
    // console.log(rating);
  }

  function handleChangeReview(e) {
    e.preventDefault();
    setReview(e.target.value);
    setTrigger(false);
    // console.log(review);
  }

  function handleChangeAuthor(e) {
    setAuthor(e.target.value);
    e.preventDefault();
    setTrigger(false);
  }

  function handleSubmit() {
    if (review.length === 0) {
      setTriggerReview(true);
      setTriggerRating(false);
    } else if (Number(rating) === 0) {
      setTriggerRating(true);
      setTriggerReview(false);
    } else {
      setAllRatings([Number(rating), ...allRatings]);

      setAllRatingsReviews([
        {
          date: date.toLocaleString(),
          author: author,
          rating: rating,
          review: review,
        },
        ...allRatingsReviews,
      ]);

      setRating(0);
      setTriggerRating(false);
      setTriggerReview(false);
      setReview("");
      setAuthor("");
      setTrigger(true);
    }
  }
  const total = allRatings.reduce((total, num) => total + num, 0);
  const average = total / Math.max(allRatings.length, 1);

  return (
    <div>
      <ReviewForm
        handleSubmit={handleSubmit}
        handleChangeRating={handleChangeRating}
        handleChangeReview={handleChangeReview}
        handleChangeAuthor={handleChangeAuthor}
        average={average}
        rating={rating}
        review={review}
        author={author}
        classes={classes}
      />
      {triggerRating === true ? (
        <p className="trigger"> Please rate us </p>
      ) : null}

      {triggerReview === true ? (
        <p className="trigger"> Please comment below </p>
      ) : null}

      {trigger === true ? (
        <p className="trigger">Thank you for your comment and rating</p>
      ) : null}

      <div className="allComments">
        <p>{allRatingsReviews.length > 0 ? "Costumer Reviews" : null}</p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {allRatingsReviews.map((obj, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">
                      <Rating
                        name="half-rating-read"
                        value={obj.rating}
                        precision={0.5}
                        readOnly
                      />
                    </TableCell>
                    <TableCell align="left">{obj.author}</TableCell>
                    <TableCell align="left">{obj.date}</TableCell>
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

export default ReviewList;
