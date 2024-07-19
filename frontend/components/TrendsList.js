import styles from '../styles/TrendsList.module.css';
import Trends from './Trends';
import Tweet from './Tweet';
import UserMenu from './UserMenu';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { trendSelector } from '../reducers/trend'
import { useRouter } from 'next/router';

function TrendsList() {

  const router = useRouter();

  const trend = router.query.name

  const [newSearchInput, setNewSearchInput] = useState(`${trend || ''}`)
  const [allTweetInBd, setallTweetInBd] = useState([])

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const changeHashTagName = (input) => {
    setNewSearchInput(input)
  }

  const useEtFetch = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hashtag: newSearchInput
      })
    }
    const request = await fetch("http://localhost:3000/hashtags/view", options);
    const response = await request.json()
    response.hashtag ? setallTweetInBd(response.posts) : setallTweetInBd([])
    dispatch(trendSelector(response.hashtag))
  }
  useEffect(() => {
    useEtFetch()
  }, [newSearchInput]);

  const timeSince = dateString => {
    const elapsedMs = new Date() - new Date(dateString);
    const elapsedSec = Math.floor(elapsedMs / 1000);
    const elapsedMin = Math.floor(elapsedSec / 60);
    const elapsedHrs = Math.floor(elapsedMin / 60);
    if (elapsedSec < 60) {
      return `${elapsedSec} secondes`;
    } else if (elapsedMin < 60) {
      return `${elapsedMin} minutes`;
    } else {
      return `${elapsedHrs} heures`;
    }
  };


  const tweetedList = allTweetInBd.map((data, i) => {
    let dateDifference = timeSince(allTweetInBd[i].creationDate)
    return (
      <Tweet username={data.author.username} message={data.content} date={dateDifference} />)
  }).reverse()

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftsection}>
          <UserMenu />
        </div>
        <div className={styles.centersection}>
          <div className={styles.centerheader}>
            <div>Hashtag</div>
          </div>

          <div className={styles.inputBlock}>
            <input className={styles.input} type='text' maxLength='280' placeholder={"#Hashtag name"} onChange={(e) => newSearchInput.length < 280 && setNewSearchInput(e.target.value.slice(0, 280))} value={newSearchInput}></input>
          </div>

          <div >
            {tweetedList}
          </div>
        </div>

        <div className={styles.rightsection}>
          <Trends changeHashTagName={changeHashTagName} />
        </div>
      </main>
    </div>
  );
}

export default TrendsList;
