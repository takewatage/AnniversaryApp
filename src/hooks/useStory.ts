import * as React from 'react';
import Ani from "../models/ani";
import linq from 'linq'
import dayjs from "dayjs"

interface story {
    title: string
    date: string
    dateCount: string
}

export default function useStory(props: Ani[]) {

    let count = 0
    const arr:story[] = []
    const mainAni = linq.from(props).firstOrDefault(x => x.type=='anniversary', new Ani({}))

    React.useEffect(()=> {


    })

    return arr


    const getStory = (count: number) => {

        if(arr.length == 10) {
            return
        }
        if(count % 10 == 0) {

            arr.push({
                title:'',
                date: dayjs(mainAni?.date).format('YYYY.MM.DD'),
                dateCount: ''
            })
        }
        count++
        getStory(count)
    }

}


