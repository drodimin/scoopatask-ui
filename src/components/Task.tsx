import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material"
import React from "react";

const Task = (props: any) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    const task = props.task;
    return <Accordion expanded={expanded} onChange={handleChange}>
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Typography>{task.name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
}

export default Task