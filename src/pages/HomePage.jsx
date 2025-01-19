import React from 'react'
import Hero from '../components/landing/Hero'
import FAQ from '../components/landing/FAQ'
import Trends from '../components/landing/Trends'
import MustDownloadedDocs from '../components/landing/MustDownloadedDocs'
import OurStatistics from '../components/landing/OurStatistics'
import About from '../components/landing/About'
import FindTeacher from '../components/landing/FindTeacher'
import Features from '../components/landing/Features'

function HomePage() {
  return (
    <>
        <Hero />
        <Features />
        <Trends />
        <MustDownloadedDocs />
        <OurStatistics />
        <FindTeacher />
        <FAQ />
        <About />
    </>
  )
}

export default HomePage
