import React from "react";
import Link from "next/link";
import styles from "../../styles/Footer.module.css";

import { FaSearch } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.foot1}>
          <h3>Madre Co.</h3>
          <ul className={styles.contact}>
            <li>
              <FaSearch />
              &nbsp;&nbsp;Sinamangal, Kathmandu
            </li>
            <li>
              <FaSearch />
              &nbsp;&nbsp;+977 9810357209, +977 9818506752
            </li>
            <li>
              <FaSearch />
              &nbsp;&nbsp;madre@gmail.com
            </li>
          </ul>

          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/imadeyoureadthis26"
              target="_blank"
              rel="noreferrer"
            >
              <FaSnapchatGhost size={35} />
            </a>
            <a
              href="https://www.instagram.com/sah_rohite"
              target="_blank"
              rel="noreferrer"
            >
              <FaSnapchatGhost size={35} />
            </a>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
            >
              <FaSnapchatGhost size={35} />
            </a>
            <a
              href="https://www.twitter.com/rohit____shah"
              target="_blank"
              rel="noreferrer"
            >
              <FaSnapchatGhost size={35} />
            </a>
            <a
              href="https://app.snapchat.com/web/deepa/snapcode?username=rohit_shah26&type=SVG&size=235"
              target="_blank"
              rel="noreferrer"
            >
              <FaSnapchatGhost size={35} />
            </a>
          </div>
        </div>

        <div className={styles.foot2}>
          <h3>Quick as</h3>
          <ul className={styles.ql}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/category">Menu</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li>
              <Link href="/aboutus">About Us</Link>
            </li>
          </ul>
        </div>

        <div className={styles.foot3}>
          <h3>Subscribe to Newsletter</h3>
          <div className={styles.news}>
            <input type="email" placeholder="Enter your email" />
          </div>
          <br />
          <a href="#" className={styles.subscribe}>
            Subscribe
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.cards}>
          <img src="Images\visa.png" className="payment" />
          <img src="Images\american-express.png" className="payment" />
          <img src="Images\mastercard.png" className="payment" />
          <img src="Images\paypal.png" className="payment" />
        </div>
        <hr width="35%" />
        <p>
          Copyright &copy; 2020, Rohit Kumar Sah. <br /> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
