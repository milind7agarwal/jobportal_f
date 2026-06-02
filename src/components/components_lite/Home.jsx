import React from 'react'
import Navbar from "./Navbar"
import Header from "./Header"
import Categories from "./Categories"
import LatestJobs from "./LatestJobs"
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs />
      {/* <Footer /> */}
    </div>
  )
}

export default Home
