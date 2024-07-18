import styles from '../styles/UserMenu.module.css';
import { useState } from 'react';

function UserMenu() {


  return (
    <div>
      <main className={styles.main}>
        <div></div>

        <div>
          <div className={styles.userInfo}>
            <div>IMAGE</div>
            <div>
              <div>NOM</div>
              <div>email</div>
            </div>
          </div>
          <div className={styles.logout}>Logout</div>

        </div>

      </main>
    </div>
  );
}

export default UserMenu;
