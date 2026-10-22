interface HeroProps {
  onExploreClick?: () => void
  onContactClick?: () => void
}

export function Hero({ onExploreClick, onContactClick }: HeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick()
    } else {
      const target = document.getElementById('services') || document.getElementById('approach')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleContact = () => {
    if (onContactClick) {
      onContactClick()
    } else {
      scrollTo('contact')
    }
  }

  return (
    <section id="hero" className="hero-section" aria-label="Introduction to UnValor">
      <div className="section-container hero-container">
        {/* Core Typographic Statement */}
        <div className="hero-content">
          <h1 className="hero-headline">
            Ideas, <br className="hero-headline-break" />made tangible.
          </h1>

          <p className="hero-supporting-text">
            We turn thoughtful ideas into digital products built for real life.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn-primary"
              onClick={handleExplore}
            >
              Explore our work <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="hero-btn-secondary"
              onClick={handleContact}
            >
              Let's talk
            </button>
          </div>
        </div>

        {/* Distinctive Studio Practice Matrix */}
        <div className="hero-practice-matrix" aria-label="UnValor Focus Areas">
          <div className="practice-matrix-grid">
            {/* Column 1: Small Business & Everyday Tools */}
            <div className="practice-card">
              <div className="practice-card-header">
                <span className="practice-index">01</span>
                <span className="practice-tag">Small Business Tools</span>
              </div>
              <h2 className="practice-title">Everyday Operations</h2>
              <p className="practice-desc">
                Practical digital tools and simple workflows built to eliminate friction and solve routine operational headaches for small businesses.
              </p>
            </div>

            {/* Column 2: Startup Software & MVPs */}
            <div className="practice-card">
              <div className="practice-card-header">
                <span className="practice-index">02</span>
                <span className="practice-tag">Startup MVPs</span>
              </div>
              <h2 className="practice-title">Practical Software</h2>
              <p className="practice-desc">
                Fast, dependable web applications and digital tools for early-stage founders looking to test real ideas with real people, not bloated roadmaps.
              </p>
            </div>

            {/* Column 3: Philosophy & How We Work */}
            <div className="practice-card">
              <div className="practice-card-header">
                <span className="practice-index">03</span>
                <span className="practice-tag">Our Approach</span>
              </div>
              <h2 className="practice-title">Human-Centered Utility</h2>
              <p className="practice-desc">
                Digital craft stripped of tech jargon. We design software around existing user habits, multi-language needs, and genuine daily usefulness.
              </p>
            </div>
          </div>

          <div className="practice-matrix-footer">
            <span className="matrix-status-dot" aria-hidden="true" />
            <span className="matrix-status-text">
              We're actively building at UnValor. · Direct founder collaboration
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
