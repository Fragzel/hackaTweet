import styles from '../styles/Home.module.css';
import Trends from './Trends';
import { useState } from 'react';

function Home() {

  const [newTweetInput, setNewTweetInput] = useState('')


  return (
    <div>
      <main className={styles.main}>


        <div className={styles.leftsection}>
          SECTION 1
        </div>




        <div className={styles.centersection}>
          <div className={styles.centerheader}>
            <div>Home</div>
          </div>

          <div className={styles.inputBlock}>
            <input className={styles.input} type='text' maxLength='280' placeholder={"What's up ?"} onChange={(e) => newTweetInput.length < 280 && setNewTweetInput(e.target.value.slice(0, 280))}></input>
            <div className={styles.inputUnderSection}>
              <div>{newTweetInput.length}/280</div>
              <div className={styles.tweetButton}>Tweet</div>
            </div>
          </div>

          <div className={styles.post}>Post1</div>
          <div className={styles.post}>Post2</div>
          <div className={styles.post}>Post3</div>

        </div>





        <div className={styles.rightsection}>
          {/* <Trends></Trends> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
