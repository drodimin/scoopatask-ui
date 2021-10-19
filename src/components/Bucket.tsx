import { Card, CardHeader, CardContent, Typography, IconButton, Stack, TextField } from "@mui/material"
import Task from './Task';
import { IBucket } from "../interfaces/AppData";
import * as api from "../api";
import { useState } from "react";
import { AddCircleTwoTone } from "@mui/icons-material";
import bucketImage from '../assets/bucket.png'
import BucketMenu from "./BucketMenu";

const Bucket = (props: any) => {

    const [bucket, setBucket] = useState<IBucket>(props.bucket);
    const [addTaskText, setAddTaskText] = useState('');
    
    const completeTask = async(bucketId: string, taskId: string) => {
        try{
            const updatedBucket = await api.completeTask(bucketId, taskId);
            setBucket(updatedBucket);
        }catch(error){
            console.log('Failed to complete task', error)
        }
    }

    const removeTask = async(bucketId: string, taskId: string) => {
        try{
            const updatedBucket = await api.deleteTask(bucketId, taskId);
            setBucket(updatedBucket);
        }catch(error){
            console.log('Failed to delete task', error)
        }
    }

    const addTask = async() => {
        try{
            const updatedBucket = await api.addTask(bucket._id, addTaskText);
            setBucket(updatedBucket);
            setAddTaskText('');
        }catch(error){
            console.log('Failed to add task', error)
        }
    }

    return <Card sx={{ width: 345}}>
         <CardHeader
            avatar={<img src={bucketImage} alt="bucket"/>}
            action={
            <BucketMenu delete={props.onDelete}></BucketMenu>
            }
            title={<Typography variant="h6" component="div">{bucket.name}</Typography>}
        />
        <CardContent>
            <Stack spacing={1} alignItems="center">
                <TextField
                    id="task-name"
                    label="New Task"
                    InputProps={{endAdornment: 
                    <IconButton aria-label="add task" onClick={addTask}><AddCircleTwoTone  style={{fill: "chocolate"}}/></IconButton>}}
                    value = {addTaskText}
                    onChange = {e => setAddTaskText(e.target.value)}
                />
                { bucket._tasks && bucket._tasks.map((task, index) => (
                    <Task key={task._id} task={task} onRemove={() => removeTask(bucket._id, task._id)}
                      onComplete={() => completeTask(bucket._id, task._id)}></Task>
                ))
            }</Stack>
        </CardContent>
    </Card>
}
export default Bucket;