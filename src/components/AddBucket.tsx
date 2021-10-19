import { AddCircleTwoTone } from "@mui/icons-material"
import { Paper, TextField, IconButton } from "@mui/material"
import { useState } from "react"

const AddBucket = (props: any) => {
    const initialState = '';
    const [addBucketName, setAddBucketName] = useState(initialState)

    const addBucket = async() => {
        try{
            await props.onAdd(addBucketName);
            setAddBucketName(initialState);
        }catch(error){
            console.log('Failed to add new bucket', error);
        }
    }

    return <Paper sx={{ width: 345}}>
        <TextField sx={{ width: "100%"}}
            id='add-bucket-name'
            label='Add Bucket'
            value={addBucketName}
            onChange = {(e)=>setAddBucketName(e.target.value)}
            InputProps={{endAdornment: 
                <IconButton aria-label="add bucket" onClick={addBucket}><AddCircleTwoTone  style={{fill: "chocolate"}}/></IconButton>}}
        >
        </TextField>
    </Paper>
}

export default AddBucket;