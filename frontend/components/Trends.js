import styles from '../styles/Trends.module.css';

import { useState, useEffect } from 'react'

function Trends() {

    const [allTrends, setAllTrends] = useState([]);

    useEffect(() => {
        const getAllTrends = async () => {
            const fetchedTrends = await fetch('http://localhost:3000/hashtags/all');
            const trends = await fetchedTrends.json();
            setAllTrends(trends.foundHashtag);
            console.log('foundhashtag : ', allTrends)
        }
        getAllTrends();
    }, [])

    const displayAllTrends = allTrends.map((trend, i) => {
        return <div className={styles.trendContainer} key={i}>
            <div className={styles.title}>#{trend.name}</div>
            <div className={styles.tweets}>{trend.posts.length}</div>
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
