import { Avatar, Card, CardHeader, CardContent, Typography, IconButton, Stack } from "@mui/material"
import { red } from "@mui/material/colors";
import React from "react"
import CircleTwoTone from '@mui/icons-material/CircleTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Task from './Task';
import { ITask, IBucket } from "../interfaces/AppData";

const Bucket = (props: any) => {
    const removeTask = (bucketId: string, taskId: string) => {

    }

    const bucket: IBucket = props.bucket;
    return <Card sx={{ width: 345}}>
         <CardHeader
            avatar={<CircleTwoTone style={{fill: "orange"}}></CircleTwoTone>}
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={<Typography variant="h6" component="div">{bucket.name}</Typography>}
        />
        <CardContent>
            <Stack spacing={1} alignItems="center">{ bucket._tasks && bucket._tasks.map((task, index) => (
                    <Task key={task._id} task={task} onDelete={() => removeTask(bucket._id, task._id)}></Task>
                ))
            }</Stack>
        </CardContent>
    </Card>
}
export default Bucket;