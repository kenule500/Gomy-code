import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HeroSection from './components/HeroSection'
import Counter from './components/Counter'
import DocsSection from './components/DocsSection'
import SocialSection from './components/SocialSection'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  return (
    <>
      <section id="center">
        <HeroSection
          heroImg={heroImg}
          reactLogo={reactLogo}
          viteLogo={viteLogo}
        />
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Counter count={count} onIncrement={handleIncrement} />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <DocsSection reactLogo={reactLogo} viteLogo={viteLogo} />
        <SocialSection />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
