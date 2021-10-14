import { Stack } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react"
import * as api from '../api'
import { IAppData } from "../interfaces/AppData";
import Bucket from "./Bucket";

const AppData = () => {

    const [data, setData] = useState<Partial<IAppData>>({});

    useEffect(() => {
        const fetchData = async() => {
            const res = await api.getData();
            console.log(res);
            setData(res);
        }
        fetchData();
    }, [])

    const removeBucket  = (id: string | undefined) => {

    }

    return <Stack spacing={1} alignItems="center">{ data._buckets && data._buckets.map((bucket, index) => (
                <Bucket key={bucket._id} bucket={bucket} onDelete={() => removeBucket(bucket._id)}></Bucket>
            ))
        }</Stack>;
}

export default AppData;