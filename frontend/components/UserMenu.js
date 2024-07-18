import styles from '../styles/UserMenu.module.css';
import { useSelector } from 'react-redux'

function UserMenu() {

  const user = useSelector((state) => state.user)


  return (
    <div>
      <main className={styles.main}>
        <div className={styles.menubutton}>
          <a href='/'></a>
        </div>

        <div>
          <div className={styles.userInfo}>
            <div><img className={styles.userImage} src='/images/Khaled.jpg' width={'50px'}></img></div>
            <div>
              <div>{user.firstname} Prenom</div>
              <div className={styles.username}>@username</div>
            </div>
          </div>
          <div className={styles.logout}>Logout</div>

        </div>

      </main >
    </div >
  );
}

export default UserMenu;
