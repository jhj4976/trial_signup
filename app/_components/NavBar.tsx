"use client"
import styles from "./Navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import brandLogo_black_2560 from "/public/imgs/home/brandLogo_black_2560.svg"
import brandLogo_black_1440 from "/public/imgs/home/brandLogo_black_1440.svg"
import brandLogo_black_720 from "/public/imgs/home/brandLogo_black_720.svg"
import brandLogo_black_360 from "/public/imgs/home/brandLogo_black_360.svg"

export default function NavBar() {
  return (
    <div className={`${styles.navBarContainer} ${styles.setWhite}`}>
      <div className={styles.navBarWrapper}>
        <div className={styles.leftPart}>
          {
            // home은 black nav가 default, 그 외 웹뷰는 white nav
            // home에서 scroll 시 white nav로 변경
            <Link href={"/"}>
              <Image
                alt="brandLogo_black_2560"
                className={styles.logo}
                src={brandLogo_black_2560}
              />
              <Image
                alt="brandLogo_black_1440"
                className={styles.logo_1440}
                src={brandLogo_black_1440}
              />
              <Image
                alt="brandLogo_black_720"
                className={styles.logo_720}
                src={brandLogo_black_720}
              />
              <Image
                alt="brandLogo_black_360"
                className={styles.logo_360}
                src={brandLogo_black_360}
              />
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
