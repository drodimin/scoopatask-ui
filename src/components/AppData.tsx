import { Stack } from "@mui/material";
import { useEffect, useState } from "react"
import * as api from '../api'
import { IBucket } from "../interfaces/AppData";
import AddBucket from "./AddBucket";
import Bucket from "./Bucket";

const AppData = () => {

    const [buckets, setBuckets] = useState<IBucket[]>();

    useEffect(() => {
        const fetchData = async() => {
            const res = await api.getData();
            console.log(res);
            setBuckets(res._buckets);
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

    return <Stack spacing={1} alignItems="center">
        <AddBucket onAdd={addBucket}></AddBucket>
        { buckets && buckets.map((bucket, index) => (
                <Bucket key={bucket._id} bucket={bucket} onDelete={() => removeBucket(bucket._id, index)}></Bucket>
            ))
        }</Stack>;
}

export default AppData;