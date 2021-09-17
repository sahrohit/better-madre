import React from "react";
import { FaSearch } from "react-icons/fa";

import styles from "../../styles/NavBar.module.css";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <p className={styles.logo}>
        Ma<span>dr</span>e
      </p>

      <div className={styles.list}>
        <Link href="/" passHref={true}>
          Home
        </Link>

        <Link href="/category" className="dropbtn">
          Menu
        </Link>

        <Link href="/events">Events</Link>

        <Link href="/jobs">Jobs</Link>

        <Link href="/aboutus" className="dropbtn">
          About Us
        </Link>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search Products"
          className="search-input"
        />
        <FaSearch />
      </div>
    </nav>
  );
};

export default NavBar;
