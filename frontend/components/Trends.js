import styles from '../styles/Trends.module.css';

import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

function Trends(props) {

    const [allTrends, setAllTrends] = useState([]);
    const router = useRouter();

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
            <div className={styles.title} onClick={() => {
                router.push({
                    pathname: '/trends',
                    query: { name: trend.name },
                }, '/trends');
                props.changeHashTagName(trend.name)
            }}>#{trend.name}</div>
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
