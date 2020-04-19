import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReviewForm from "./ReviewForm";

function ReviewList() {
  const [allRatingsReviews, setAllRatingsReviews] = useState([]);

  const total = allRatingsReviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  const average = (total / Math.max(allRatingsReviews.length, 1)).toFixed(1);

  const onSubmit = (formData) => {
    setAllRatingsReviews([formData, ...allRatingsReviews]);
  };

  return (
    <div>
      <ReviewForm onSubmit={onSubmit} />

      <div className="headerRating">
        <Rating
          name="half-rating-read"
          value={Number(average)}
          precision={0.5}
          number={average}
          readOnly
        />
        <p>{average}</p>
      </div>

      <div className="allComments">
        <p>{allRatingsReviews.length > 0 ? "Costumer Reviews" : null}</p>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
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
