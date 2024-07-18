import styles from '../styles/Home.module.css';
import Trends from './Trends';
import UserMenu from './UserMenu';
import Tweet from './Tweet';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const [newTweetInput, setNewTweetInput] = useState('')
  const [infoForTweet, setInfoForTweet] = useState([])


  const user = useSelector((state) => state.user);



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
    const jsonTweet = await newTweet.json()
    if (jsonTweet.result) {
      setInfoForTweet([...infoForTweet, { username: user.username, message: newTweetInput }])
    }
    // setInfoForTweet([])

    console.log("infoforTwit", infoForTweet)
  }

  const tweet = infoForTweet.map(data => {
    return <Tweet username={data.username} message={data.message} />
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
