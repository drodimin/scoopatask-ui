import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import * as api from '../api'
import { IBucket } from "../interfaces/AppData";
import AddBucket from "./AddBucket";
import Bucket from "./Bucket";

const AppData = () => {

    const [buckets, setBuckets] = useState<IBucket[]>();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try{
            const res = await api.getData();
            console.log(res);
            setBuckets(res._buckets);
            }
            catch(error: any){
                console.log('Failed loading data', error)
                setError(true)
            }
        }
        fetchData();
    }, [])

    const removeBucket  = async(id: string, index: number ) => {
        await api.deleteBucket(id);
        console.log('Removing bucket', index)

        const newBuckets = buckets?.slice()
        newBuckets?.splice(index, 1);
        setBuckets(newBuckets)
    }

    const addBucket = async(name: string) => {
        const newBucket = await api.addBucket(name);
        const updatedBuckets = buckets?.slice();
        updatedBuckets?.push(newBucket);
        setBuckets(updatedBuckets);
    }

    let content;
    if(error) {
        content = <Typography variant="h5">Something went wrong. Failed to load data.</Typography>;
    } else {
        content = <><AddBucket onAdd={addBucket}></AddBucket>
        { buckets && buckets.map((bucket, index) => (
                <Bucket key={bucket._id} bucket={bucket} onDelete={() => removeBucket(bucket._id, index)}></Bucket>
            ))
        }</>
    }
    return <Stack spacing={1} alignItems="center">{content}</Stack>;
}

export default AppData;