import React from "react";
import Rating from "@material-ui/lab/Rating";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Review({ allRatingsReviews }) {
  const classes = useStyles();
  return (
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
          })
          //   <tr className="reviewComponent" key={index}>
          //     <td>{obj.date}</td>
          //     <td>
          //
          //     </td>
          //     <td>
          //       <p>{obj.review}</p>
          //     </td>
          //   </tr>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Review;
