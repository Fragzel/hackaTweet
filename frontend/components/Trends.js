import styles from '../styles/Trends.module.css';

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { trendSelector } from '../reducers/trend'

function Trends() {

    const [allTrends, setAllTrends] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllTrends = async () => {
            const fetchedTrends = await fetch('http://localhost:3000/hashtags/all');
            const trends = await fetchedTrends.json();
            setAllTrends(trends.foundHashtag);
        }
        getAllTrends();
    }, [])

    const displayAllTrends = allTrends.map((trend, i) => {
        return <div className={styles.trendContainer} key={i}>
            <a href='/trends' className={styles.title} onClick={() => dispatch(trendSelector(trend.name))}>#{trend.name}</a>
            <div className={styles.tweets}>{trend.posts.length} tweets</div>
        </div>
    })

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.rightheader}>
                    <div>Trends</div>
                </div>
                <div className={styles.hashTagList}>
                    {displayAllTrends}
                </div>
            </main>
        </div>
    );

}

export default Trends;
