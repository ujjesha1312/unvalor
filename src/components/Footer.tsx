interface FooterProps {
  onReplayIntro: () => void
}

export function Footer({ onReplayIntro }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="studio-footer" role="contentinfo">
      <div className="section-container footer-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="#hero" className="footer-brand-title" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              UnValor<span className="brand-degree">°</span>
            </a>
            <p className="footer-signature-line">BY UJJESHA</p>
            <p className="footer-brand-tagline">
              Digital product studio for founders, creators, and engineering teams.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-heading">Navigation</span>
            <ul className="footer-nav-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#approach">Our Approach</a></li>
              <li><a href="#about">About Studio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-heading">Experience</span>
            <ul className="footer-nav-list">
              <li>
                <button
                  type="button"
                  className="footer-replay-action"
                  onClick={onReplayIntro}
                  title="Replay the animated brand-reveal intro sequence"
                >
                  <span className="replay-btn-icon" aria-hidden="true">↺</span> Replay Brand Reveal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-replay-action"
                  onClick={scrollToTop}
                >
                  ↑ Back to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} UnValor. All rights reserved.
          </p>
          <p className="footer-colophon">
            Midnight Navy · Deep Navy · Slate Blue · Warm Cream
          </p>
        </div>
      </div>
    </footer>
  )
}
