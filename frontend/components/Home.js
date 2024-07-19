import styles from '../styles/Home.module.css';
import Trends from './Trends';
import UserMenu from './UserMenu';
import Tweet from './Tweet';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToTweetList } from '../reducers/tweet';

function Home() {
  const [newTweetInput, setNewTweetInput] = useState('')
  const [allTweetInBd, setallTweetInBd] = useState([])

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const tweet = useSelector((state) => state.tweet);


  const useEtFetch = async () => {
    const request = await fetch("http://localhost:3000/posts/all")
    const response = await request.json()
    setallTweetInBd(response.allPosts)
    console.log("res", response.allPosts)
    dispatch(AddToTweetList(response.allPosts))

  }
  useEffect(() => {
    useEtFetch()


  }, []);

  console.log("twit", tweet)


  const newTweetPost = async () => {

    const newTweet = await fetch('http://localhost:3000/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: user.username,
        token: user.token,
        content: newTweetInput
      })
    })
    useEtFetch()
  }


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

  const Input = () => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        newTweetPost()
        setNewTweetInput("")
      }
    }
  }
  console.log("alltwitindb", allTweetInBd)

  const tweetedList = allTweetInBd.map((data, i) => {
    let dateDifference = timeSince(allTweetInBd[i].creationDate)
    return <Tweet username={data.author.username} message={data.content} date={dateDifference} />
  }).reverse()

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftsection}>
          <UserMenu />
        </div>
        <div className={styles.centersection}>
          <div className={styles.centerheader}>
            <div>Home</div>
          </div>

          <div className={styles.inputBlock}>
            <input className={styles.input} type='text' maxLength='280' placeholder={"What's up ?"} onChange={(e) => newTweetInput.length < 280 && setNewTweetInput(e.target.value.slice(0, 280))} value={newTweetInput}></input>
            <div className={styles.inputUnderSection}>
              <div>{newTweetInput.length}/280</div>
              <div className={styles.tweetButton} onClick={async () => { newTweetPost(); setNewTweetInput("") }}   >Tweet</div>
            </div>
          </div>

          <div >
            {tweetedList}
          </div>


        </div>





        <div className={styles.rightsection}>
          <Trends />
        </div>
      </main>
    </div>
  );
}

export default Home;
