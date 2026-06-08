interface HeroSectionProps {
  heroImg: string
  reactLogo: string
  viteLogo: string
}

function HeroSection({ heroImg, reactLogo, viteLogo }: HeroSectionProps) {
  return (
    <div className="hero">
      <img src={heroImg} className="base" width="170" height="179" alt="" />
      <img src={reactLogo} className="framework" alt="React logo" />
      <img src={viteLogo} className="vite" alt="Vite logo" />
    </div>
  )
}

export default HeroSection