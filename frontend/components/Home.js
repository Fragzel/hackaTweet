import styles from '../styles/Home.module.css';
import Trends from './Trends';
import UserMenu from './UserMenu';
import Tweet from './Tweet';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const [newTweetInput, setNewTweetInput] = useState('')
  const [allTweetInBd, setallTweetInBd] = useState([])
  const [allLikedPosts, setAllLikedPosts] = useState([])
  const [hashtagString, setHashtagString] = useState('')


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const recupererHashtag = () => {
    if (newTweetInput.includes('#')) {
      const indexOfHashtagSymbol = newTweetInput.indexOf('#');
      console.log(indexOfHashtagSymbol);
      // setHashtagString(newTweetInput.slice(indexOfHashtagSymbol, -1))
    }
  }

  const useEtFetch = async () => {
    const request = await fetch("http://localhost:3000/posts/all")
    const response = await request.json()
    setallTweetInBd(response.allPosts)

    const requestLikedPosts = await fetch("http://localhost:3000/users/allLikedPosts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token })
    })
    const allLikedPostsResponse = await requestLikedPosts.json()
    setAllLikedPosts([])
    setAllLikedPosts(allLikedPostsResponse.allLikedPosts)
  }
  useEffect(() => {
    useEtFetch()
  }, []);

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

  const removeTweet = async (postId) => {
    const tweetToRemove = await fetch('http://localhost:3000/posts/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postID: postId })
    })
    useEtFetch()
  }

  const likePost = async (idAndUsername) => {
    const likeFetch = await fetch('http://localhost:3000/users/likePost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postID: idAndUsername.postID, username: user.username, token: user.token })
    })
    const response = await likeFetch.json()
    useEtFetch()
  }


  const tweetedList = allTweetInBd.map((data, i) => {

    let heartStyle;
    if (allLikedPosts.includes(data._id)) {
      heartStyle = { color: "red" }
    } else {
      heartStyle = { color: "white" }
    }

    let dateDifference = timeSince(allTweetInBd[i].creationDate)
    return <Tweet key={i}
      username={data.author && data.author.username}
      message={data.content}
      date={dateDifference}
      removeTweet={removeTweet}
      id={data._id}
      likePost={likePost}
      liked={heartStyle}
    />
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
            <input className={styles.input} type='text' maxLength='280' placeholder={"What's up ?"} onChange={(e) => newTweetInput.length < 280 && setNewTweetInput(e.target.value.slice(0, 280)) && recupererHashtag()} value={newTweetInput}></input>
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
