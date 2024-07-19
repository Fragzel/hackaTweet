import styles from '../styles/UserMenu.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/user';

function UserMenu() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();



  return (
    <div>
      <main className={styles.main}>
        <div className={styles.menubutton}>
          <a href='/'>
            <img src="/images/logo_twitter.png" alt="twitterLogo" className={styles.logoTwitter}></img>
          </a>

        </div>

        <div>
          <div className={styles.userInfo}>
            <div><img className={styles.userImage} src={user.image} width={'50px'} ></img></div>
            <div>
              <div>{user.firstname}</div>
              <div className={styles.username}>@{user.username}</div>
            </div>
          </div>
          <div className={styles.logout} onClick={() => dispatch(logout())}>Logout</div>

        </div>

      </main >
    </div >
  );
}

export default UserMenu;
