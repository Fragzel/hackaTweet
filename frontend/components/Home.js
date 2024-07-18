import styles from '../styles/Home.module.css';
import Trends from './Trends';
import UserMenu from './UserMenu';
import Tweet from './Tweet';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const [newTweetInput, setNewTweetInput] = useState('')
  const [allTweetInBd, setallTweetInBd] = useState([])


  const user = useSelector((state) => state.user);

  useEffect(() => {
    const useEtFetch = async () => {
      const request = await fetch("http://localhost:3000/posts/all")
      const response = await request.json()
      console.log("response", response)
      setallTweetInBd(response.allPosts)
    }
    useEtFetch()
  }, []);

  const newTweetPost = async () => {

    const objectForANewTweet = {
      author: user.username,
      token: user.token,
      content: newTweetInput
    }
    const newTweet = await fetch('http://localhost:3000/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objectForANewTweet)
    })
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




  const tweet = allTweetInBd.map((data, i) => {
    let dateDifference = timeSince(allTweetInBd[0].creationDate)
    return <Tweet username={data.author.username} message={data.content} date={dateDifference} />
  })
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
              <div className={styles.tweetButton} onClick={() => { newTweetPost(); setNewTweetInput("") }}>Tweet</div>
            </div>
          </div>

          <div >
            {tweet}
          </div>


        </div>





        <div className={styles.rightsection}>
          {/* <Trends></Trends> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
