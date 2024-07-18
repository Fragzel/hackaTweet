import styles from '../styles/Trends.module.css';

import { useState, useEffect } from 'react'

function Trends() {

    const [allTrends, setAllTrends] = useState([]);

    useEffect(() => {

        const getAllTrends = async () => {
            const fetchedTrends = await fetch('http://localhost:3000/hashtag/all');
            const trends = await fetchedTrends.json();
            setAllTrends(trends);
        }
        getAllTrends();

    }, [])

    const displayAllTrends = allTrends.map((trend, i) => {
        return <div className={styles.trendContainer} key={i}>
            <div className={styles.title}>{trend.name}</div>
            <div className={styles.tweets}>{trend.posts.length}</div>
        </div>
    })

    return (
        <div>
            <main className={styles.main}>
                {displayAllTrends}
            </main>
        </div>
    );
}

export default Trends;
