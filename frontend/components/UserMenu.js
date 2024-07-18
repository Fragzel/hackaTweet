import styles from '../styles/UserMenu.module.css';
import { useSelector } from 'react-redux'

function UserMenu() {


  const user = useSelector((state) => state.user)
  console.log(user)


  return (
    <div>
      <main className={styles.main}>
        <div className={styles.menubutton}>
          <a href='/'></a>
        </div>

        <div>
          <div className={styles.userInfo}>
            <div><img className={styles.userImage} src={user.image} width={'50px'}></img></div>
            <div>
              <div>{user.firstname}</div>
              <div className={styles.username}>@{user.username}</div>
            </div>
          </div>
          <div className={styles.logout}>Logout</div>

        </div>

      </main >
    </div >
  );
}

export default UserMenu;
