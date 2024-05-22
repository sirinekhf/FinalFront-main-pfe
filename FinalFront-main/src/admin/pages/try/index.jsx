import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",

        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Link to="/productDetails">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexWrap: "nowrap" }}
        >
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={`../../assets/garfield_.png`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
      <Link to="/productDetails">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexWrap: "nowrap" }}
        >
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={`../../assets/garfield_.png`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                $19.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
}
