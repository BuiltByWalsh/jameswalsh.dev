import { PageLayout } from '@ui/Layouts'
import Image from 'next/image'
import { css } from 'styled-system/css'
import { Accordion } from '@ui/Accordion'

export const metadata = {
  title: 'James Walsh | About',
  description: `Learn more about me.`,
}

const sideProfile = css({
  mr: 'auto',
  mb: '2rem',
  borderRadius: 'lg',
})
const h2 = css({
  width: '100%',
  fontSize: {
    mdTo2xl: '3xl',
    smDown: 'xl',
  },
  textAlign: 'left',
})

export default function AboutPage() {
  return (
    <>
      <Image
        src="/portraits/side-profile.jpeg"
        alt="Picture of James Side Profile"
        width={320}
        height={320}
        className={sideProfile}
      />
      <PageLayout.Title align="left">Hey, I&apos;m James.</PageLayout.Title>
      <h2 className={h2}>
        I live in Salt Lake City, where I write code & enjoy the Great Outdoors.
      </h2>
      <PageLayout.Content>
        <Accordion>
          <Accordion.Item>
            <Accordion.Button>Intro</Accordion.Button>
            <Accordion.Panel>
              Growing up I was always drawn to music, art, video games, and
              writing. In retrospect, it&apos;s easy to see the natural velocity
              that ended up eventually becoming a career. For as long as I can
              remember I&apos;ve had a sincere intrigue for computers. My
              earliest memory of using a computer was booting up{' '}
              <b>The Oregon Trail</b> from a floppy disk at my Grandma&apos;s
              house during the summer of 2001. As the years went on I remember
              rushing home from class to play Runescape on our shared family
              Windows XP machine. Or receiving my first 30GB Video iPod which
              absolutely changed my relationship to music forever. At least at a
              subtle level, I&apos;ve always been drawn to the intersection of
              hardware, software, and artistic expression. But I had no idea who
              was building these machines & applications I was using, or how
              they worked. I thought it was actual magi, which I was happy to be
              the beneficiary of my entire life.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Button>How I Got Started</Accordion.Button>
            <Accordion.Panel>
              Fast forward to summer of 2014, I was working full-time while
              taking a semester off from my business management major. Spring
              Semester had left me feeling like I was approaching an
              intersection in life. I knew my major wasn&apos;t a great fit, but
              I wasn&apos;t sure what was next. One night in early June 2014, I
              was drivng home bursting with excitement because for the first
              time ever I was going to boot up my new <b>Gaming PC</b>. As I
              thought about pressing the power button on my new gaming rig, a
              thought popped into my head that I couldn&apos;t get rid of.
              Instead of playing games tonight, What if I sat down at the
              keyboard and just tried to build something... Earlier that day,
              one of my teammates had mentioned that they were transitioning
              onto the software development team. And hearing that made
              something spark in my brain. Rather than rushing home every night
              to tinker with computers, I wanted to understand how they worked.
              I wanted to see if it was viable for me to make a career out of
              this, not a night time hobby. What came next was a summers long
              blur of mastering HTML, CSS, and beginning to read a books on
              JavaScript and Ruby. Before I knew it summer had ended, Fall was
              here and I was enrolled in DevMountain, a fully immersive full
              stack JavaScript bootcamp. Each day and I felt newfound excitement
              every time I walked out the front door to catch the train and head
              to class.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Button>Beginnings</Accordion.Button>
            <Accordion.Panel>
              By January of 2015 I had landed my first job as an Associate
              Software Engineer at IntegraCore (now Maersk). Where I felt
              fortunate and lucky to be mentored by some of the best Ruby on
              Rails Developers in my area. That foundation blossomed into a
              decades long full-stack career in web development, where I am
              baffled and proud to say that Im still learning new things that
              challenge my thinking to this day. Thanks for being here and for
              stopping by.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Button>Today</Accordion.Button>
            <Accordion.Panel>
              Today I&apos;m a seasoned full stack software engineer who loves
              frontend web development. I&apos;ve been fortunate enough to gain
              experience in monoliths, monorepos, & microservices. I&apos;ve
              learned both the easy way and the hard way about what can go right
              and wrong with all of them. I&apos;ve contributed to scaling
              Node.js APIs from Go to Market to Enterprise SaaS. I&apos;ve
              co-founded & contributedd to hand crafted Design Systems.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Button>What I care about</Accordion.Button>
            <Accordion.Panel>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </PageLayout.Content>
    </>
  )
}
