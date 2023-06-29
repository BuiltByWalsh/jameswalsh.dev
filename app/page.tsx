import { container } from 'styled-system/patterns'
import { css } from 'styled-system/css'

const mainStyles = container()

const nameSectionStyles = css({
  textAlign: 'start',
})
export default function Home() {
  return (
    <div className={mainStyles}>
      <section className={nameSectionStyles}>
        <h1>Hi 👋🏻 I&apos;m James</h1>
        <h2>Full Stack JavaScript Engineer & Experienced Web Enthusiast</h2>
      </section>
    </div>
  )
}
