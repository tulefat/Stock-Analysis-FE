import React, { useEffect } from "react"
import { Container, Button, Row, Col, Badge, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import "../../assets/styles/landing.css"

const logoSrc = "/images/stock_analysis-logo.png"

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
  const year = new Date().getFullYear()

  useEffect(() => {
    gsap.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
    gsap.from(".hero-heading", { y: 30, opacity: 0, duration: 0.8, delay: 0.1 })
    gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.7, delay: 0.2 })
    gsap.from(".hero-ctas", { y: 20, opacity: 0, duration: 0.7, delay: 0.3 })

    gsap.from(".hero-card", {
      x: 40,
      opacity: 0,
      duration: 0.9,
      delay: 0.3,
      ease: "power3.out",
    })

    gsap.from(".feature-card", {
      scrollTrigger: { trigger: "#features", start: "top 75%" },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="stock_analysis-page min-vh-100 text-light animated-bg">
      <main>
        <Container style={{ maxWidth: 1040 }} className="pt-5 pb-5">

          <section className="hero-section">
            <Row className="g-5 align-items-center">
              <Col md={7}>
                <p className="hero-eyebrow text-uppercase mb-2">
                  Intrinsic value investing
                </p>

                <h1 className="hero-heading display-5 fw-bold lh-sm">
                  Analyze stocks using the{" "}
                  <span className="text-sky">10-cap</span> valuation method.
                </h1>

                <p className="hero-sub text-slate-200 mt-3 mb-4">
                  Estimate intrinsic value using a Buffett-style 10-cap approach,
                  see whether a stock is undervalued, fair, or overvalued, and
                  track it in your watchlist over time.
                </p>

                <div className="hero-ctas d-flex gap-3 mb-4">
                  <Button
                    as={Link}
                    to="/register"
                    className="cta-primary px-4 py-2 fw-semibold"
                  >
                    Create free account{" "}
                    <Icon icon="mdi:arrow-right" className="ms-2" />
                  </Button>

                  <Button
                    as={Link}
                    to="/signin"
                    variant="outline-light"
                    className="px-4 py-2 fw-semibold"
                  >
                    Sign in
                  </Button>
                </div>

                <div className="hero-metadata small text-slate-300">
                  Educational tool only — not financial advice.
                </div>
              </Col>

              <Col md={5}>
                <div className="hero-card glass-panel p-4 rounded-4 shadow-lg">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <div className="small text-slate-300">
                        Example valuation
                      </div>
                      <div className="fw-semibold">10-cap result</div>
                    </div>
                    <Badge pill className="badge-ontrack">
                      Undervalued
                    </Badge>
                  </div>

                  <Row className="g-2">
                    <Col xs={4}>
                      <Card className="mini-stat">
                        <Card.Body className="p-3">
                          <div className="small text-slate-300">Price</div>
                          <div className="fw-semibold">$165</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={4}>
                      <Card className="mini-stat">
                        <Card.Body className="p-3">
                          <div className="small text-slate-300">Fair</div>
                          <div className="fw-semibold text-emerald">$210</div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={4}>
                      <Card className="mini-stat">
                        <Card.Body className="p-3">
                          <div className="small text-slate-300">Gap</div>
                          <div className="fw-semibold text-sky">+27%</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </section>


          <section id="features" className="mt-5 pt-4">
            <Row className="g-3">
              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4">
                  <h6 className="fw-semibold">10-cap intrinsic value</h6>
                  <p className="text-slate-300 mb-0">
                    Calculate intrinsic value from cash flows using a consistent
                    valuation framework.
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4">
                  <h6 className="fw-semibold">Clear valuation status</h6>
                  <p className="text-slate-300 mb-0">
                    Instantly see whether a stock is undervalued, fair, or
                    overvalued.
                  </p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-card card-surface p-4 rounded-4">
                  <h6 className="fw-semibold">Watchlist tracking</h6>
                  <p className="text-slate-300 mb-0">
                    Save analyses and revisit your buy or sell decisions later.
                  </p>
                </div>
              </Col>
            </Row>
          </section>


          <section className="mt-5 pt-4 text-center small text-slate-400">
            © {year} Stock Analysis — intrinsic value research tool.
          </section>
        </Container>
      </main>
    </div>
  )
}

export default LandingPage
