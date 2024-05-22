import { Box, useTheme, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import Header from "../../components/Header";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asqued Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            An important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            An important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            An important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            An important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default FAQ;
