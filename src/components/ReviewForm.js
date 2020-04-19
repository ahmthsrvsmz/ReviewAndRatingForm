import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const initial = {
  rating: 0,
  author: "",
  review: "",
};

function ReviewFrom({ onSubmit }) {
  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {
      ...formData,
      date: new Date().toLocaleString(),
      rating: Number(formData.rating),
    };
    onSubmit(result);
    setFormData(initial);
  };

  return (
    <div>
      <div className="ratingReview">
        <div className="rating">
          <Rating
            name="rating"
            defaultValue={0}
            value={Number(formData.rating)}
            onChange={handleChange}
          />
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="review">
            <div className="nameField">
              <TextField
                name="author"
                label="Author"
                value={formData.author}
                variant="outlined"
                required
                onChange={handleChange}
              />
            </div>
            <div className="textField">
              <TextField
                name="review"
                label="Review"
                variant="outlined"
                value={formData.review}
                fullWidth
                required
                onChange={handleChange}
              />
            </div>
            <div className="button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
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
