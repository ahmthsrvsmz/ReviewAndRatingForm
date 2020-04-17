import React from "react";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const boolean = true;

function ReviewFrom({
  handleChangeRating,
  handleChangeReview,
  handleChangeAuthor,
  handleSubmit,
  average,
  rating,
  review,
  author,
  classes,
}) {
  return (
    <div>
      <header className="App-header">
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
      </header>
      <div className="ratingReview">
        <div className="rating">
          <Rating
            name="half-rating"
            defaultValue={0}
            value={rating}
            onChange={handleChangeRating}
          />
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <div className="review">
            <div className="nameField">
              <TextField
                key="author"
                id="outlined-basic"
                label="Author"
                value={author}
                variant="outlined"
                onChange={handleChangeAuthor}
              />
            </div>
            <div className="textField">
              <TextField
                key="textField"
                id="outlined-basic"
                label="Review (Max 160 - Min 5 Character)"
                variant="outlined"
                value={review}
                fullWidth={boolean}
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
      </div>
    </div>
  );
}

export default ReviewFrom;
