import Navbar from "../../components/ui/dashboard/navbar/navbar"
import Sidebar from "../../components/ui/dashboard/sidebar/sidebar"
import styles from "../../components/ui/dashboard/dashboard.module.css"
import Footer from "../../components/ui/dashboard/footer/footer"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout