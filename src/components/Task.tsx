import { CircleTwoTone } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material"
import React from "react";

const Task = (props: any) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    const task = props.task;
    return <Accordion expanded={expanded} onChange={handleChange} sx={{width:"100%"}}>
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Box sx={{mr:1}}><CircleTwoTone style={{fill: "orange"}}></CircleTwoTone></Box><Typography>{task.name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Box><Button variant="outlined" color="success"  onClick={props.onComplete}>Complete</Button></Box>
        <Box><Button variant="outlined" color="secondary"  onClick={props.onRemove}>Remove</Button></Box>
      </Stack>
    </AccordionDetails>
  </Accordion>
}

export default Task