import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import withScrolling from "react-dnd-scrolling";
import * as api from '../api'
import { IBucket } from "../interfaces/AppData";
import { useViewport } from "../utils/UseViewport";
import AddBucket from "./AddBucket";
import Bucket from "./Bucket";

const ScrollingComponent = withScrolling('div');

const AppData = () => {

    const [buckets, setBuckets] = useState<IBucket[]>();
    const [error, setError] = useState(false);

    const { width } = useViewport();
    const breakpoint = 500;

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

    const moveBucket = async(targetBucketId:string, destBucketId: string) => {
        console.log('move bucket called');
        try{
            const updatedBuckets = await api.moveBucket(targetBucketId, destBucketId);
            setBuckets(updatedBuckets);
        }
        catch(error: any){
            console.log('Failed to move bucket:', error);
        }
      }

    let content;
    if(error) {
        content = <Typography variant="h5">Something went wrong. Failed to load data.</Typography>;
    } else {
        content = <><AddBucket onAdd={addBucket}></AddBucket>
        { buckets && buckets.map((bucket, index) => (
                <Bucket key={bucket._id} bucket={bucket} onDelete={() => removeBucket(bucket._id, index)}
                    onMove={moveBucket}></Bucket>
            ))
        }</>
    }
    return <ScrollingComponent style={{height: '100%', overflowY: breakpoint > width ? 'scroll' : 'hidden'}}>
            <Stack spacing={1} alignItems="center">{content}</Stack>
        </ScrollingComponent>;
}

export default AppData;