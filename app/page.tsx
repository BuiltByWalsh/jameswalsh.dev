import { circle, vstack, hstack, divider, grid, wrap, stack, gridItem, flex } from 'styled-system/patterns'
import { css, cx } from 'styled-system/css'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@ui/Card'
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ClockIcon,
  CodeBracketIcon,
  InboxArrowDownIcon,
  LinkIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { PageLayout } from '@ui/Layouts'
import { Button } from '@ui/Button'
import { UnorderedList } from '@ui/List'
import fetchPosts from './posts/fetchPosts'
import { ArticleCTA } from './posts/ArticleCTA'
import { TimeFormat } from '@/components/TimeFormat'
import { calculateTimeToRead } from '@/helpers'

const AVATAR_SIZE = 120
const HANDLE = 'jamesandersonwalsh'

const introSection = vstack({
  gap: 10,
  alignItems: 'start',
})
const socialLinkStack = hstack({
  gap: 4,
})
const socialIconLink = hstack({
  gap: 2,
  alignItems: 'center',
  '& .icon': {
    width: '24px',
    height: '24px',
    color: 'heading',
  },
})
const pageDivider = divider({
  color: 'tertiaryTextLight',
})
const columnGrid = grid({
  mt: '4rem',
  gap: 6,
  columns: 12,
})
const column = stack({
  gap: 6,
})
const postTitle = css({
  maxWidth: '90%',
  fontWeight: 'medium',
})
const companyLogo = circle()
const dl = wrap({
  gap: 2,
  width: '100%',
})
const dt = css({
  display: 'none',
})
const ddBold = css({
  fontWeight: 'semibold',
  width: 'full',
  fontSize: 'md',
})
const ddLight = css({
  fontWeight: 'normal',
  fontSize: 'xs',
})
const ddDate = css({
  ml: 'auto',
  fontSize: 'xs',
  fontWeight: 'lighter',
})
const blogPostDescriptor = css({
  fontSize: 'sm',
  fontWeight: 'normal',
  mb: '1rem',
})
const blogLinks = hstack({
  width: '100%',
  gap: 4,
})
const blogLogo = css({
  borderRadius: 'md',
  mr: '16px',
})
const buttonIcon = css({
  mr: '16px',
})

interface CVItem {
  image: React.ReactNode
  company: string
  role: string
  startDate: string
  endDate: string
}
interface SocialLink {
  name: string
  href: string
  icon: React.ReactElement
}

export default function Home() {
  const cvItems: CVItem[] = [
    {
      image: (
        <Image
          src="/logos/employers/vasion.png"
          width={36}
          height={36}
          alt="Vasion company logo"
          className={companyLogo}
        />
      ),
      company: 'Vasion',
      role: 'Staff Software Engineer',
      startDate: '2022',
      endDate: 'Present',
    },
    {
      image: (
        <Image
          src="/logos/employers/podium.jpg"
          width={36}
          height={36}
          alt="Podium company logo"
          className={companyLogo}
        />
      ),
      company: 'Podium',
      role: 'Senior Software Engineer',
      startDate: '2021',
      endDate: '2022',
    },
    {
      image: (
        <Image
          src="/logos/employers/pluralsight.png"
          width={36}
          height={36}
          alt="Pluralsight company logo"
          className={companyLogo}
        />
      ),
      company: 'Pluralsight',
      role: 'Full Stack Software Engineer',
      startDate: '2016',
      endDate: '2020',
    },
    {
      image: (
        <Image
          src="/logos/employers/maersk.jpg"
          width={36}
          height={36}
          alt="Maersk company logo"
          className={companyLogo}
        />
      ),
      company: 'Maersk',
      role: 'Software Engineer',
      startDate: '2014',
      endDate: '2016',
    },
  ]

  const socialLinks: SocialLink[] = [
    {
      name: 'Github',
      href: `https://github.com/${HANDLE}`,
      icon: (
        <svg className="icon" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: `https://discordapp.com/users/${HANDLE}`,
      icon: (
        <svg className="icon" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/in/${HANDLE}`,
      icon: (
        <svg className="icon" fill="currentColor">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
    },
  ]

  const posts = fetchPosts()

  return (
    <div>
      <section className={introSection}>
        <Image
          src="/portraits/front-profile.jpg"
          className={circle()}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          alt="James profile picture"
          unoptimized
        />
        <PageLayout.Title>Software engineer. Self-proclaimed developer advocate. UI/UX enthusiast.</PageLayout.Title>
        <div className={socialLinkStack}>
          {socialLinks.map(({ name, href, icon }) => (
            <Link key={name} href={href} className={socialIconLink}>
              {icon}
            </Link>
          ))}
        </div>
        <hr className={pageDivider} />
        <p className={css({ fontSize: 'lg' })}>
          Hey, I&apos;m James! I&apos;m a Full Stack Javascript Engineer who loves frontend web development. Over the
          last decade I&apos;ve been a part of shipping new products to market, scaling Node.js applications, building
          beautiful Design Systems, & working on cross-functional teams with other talented people I can learn from. I
          believe that no tech talk is complete without memes.
        </p>
      </section>
      <br />
      <div className={columnGrid}>
        <div
          className={cx(
            column,
            gridItem({
              colSpan: {
                mdTo2xl: 7,
                smDown: 12,
              },
            }),
          )}
        >
          {posts.map((post) => (
            <Link key={post._id} href={post.url}>
              <Card variant="ghost">
                <h3 className={postTitle}>{post.title}</h3>
                <Card.Body>
                  <div className={stack({ gap: 4 })}>
                    <span className={flex({ alignItems: 'center' })}>
                      <CalendarDaysIcon width={24} height={24} />
                      &nbsp;
                      <TimeFormat dateTime={post.publishedAt} />
                    </span>
                    <span className={flex({ alignItems: 'center' })}>
                      <ClockIcon width={16} height={16} />
                      &nbsp;
                      {calculateTimeToRead(post.body.raw)}&nbsp;min read
                    </span>
                    <span>{post.brief}</span>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <ArticleCTA />
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </div>
        <div
          className={cx(
            column,
            gridItem({
              colSpan: {
                mdTo2xl: 5,
                smDown: 12,
              },
            }),
          )}
        >
          <Card variant="outline">
            <Card.Header icon={<NewspaperIcon width={24} height={24} />}>See what I&apos;ve published</Card.Header>
            <Card.Body>
              <p className={blogPostDescriptor}>
                Get notified when I publish new posts, unsubscribe any time. My blog is hosted here, & published to
                Hashnode & DEV.to.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="outline" as="a" href="#publications">
                <InboxArrowDownIcon className={buttonIcon} width={24} height={24} />
                Subscribe
              </Button>
            </Card.Footer>
          </Card>
          <Card variant="outline">
            <Card.Header icon={<CodeBracketIcon width={24} height={24} />}>How I made this site</Card.Header>
            <Card.Body>
              This site was built with Next.js, Typescript, & Contentlayer. In addition, all these styles are
              hand-crafted using PandaCSS. Use the link below to checkout the source code.
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" as="a" href="https://github.com/jamesandersonwalsh/portfolio" download>
                <LinkIcon className={buttonIcon} width={24} height={24} />
                Visit Github
              </Button>
            </Card.Footer>
          </Card>
          <Card variant="outline">
            <Card.Header icon={<BriefcaseIcon width={24} height={24} />}>Work</Card.Header>
            <Card.Body>
              <UnorderedList>
                {cvItems.map((cvItem) => (
                  <UnorderedList.ListItem key={cvItem.company}>
                    {cvItem.image}
                    <dl className={dl}>
                      <dt className={dt}>Company</dt>
                      <dd className={ddBold}>{cvItem.company}</dd>
                      <dt className={dt}>Role</dt>
                      <dd className={ddLight}>{cvItem.role}</dd>
                      <dt className={dt}>Date</dt>
                      <dd className={ddDate}>
                        <time dateTime={cvItem.startDate}>{cvItem.startDate}</time>
                        <span aria-hidden="true"> — </span>
                        <time dateTime={cvItem.startDate}>{cvItem.endDate}</time>
                      </dd>
                    </dl>
                  </UnorderedList.ListItem>
                ))}
                <UnorderedList.ListItem>
                  <Button variant="secondary" as="a" href="resume.pdf" download>
                    <ArrowDownTrayIcon className={buttonIcon} width={24} height={24} />
                    Download CV
                  </Button>
                </UnorderedList.ListItem>
              </UnorderedList>
            </Card.Body>
          </Card>
        </div>
        <div
          className={cx(
            column,
            gridItem({
              colSpan: {
                mdTo2xl: 12,
                smDown: 12,
              },
            }),
          )}
        >
          <hr className={pageDivider} />
          <h2 id="publications">See what I&apos;ve published</h2>
        </div>
        <div
          className={gridItem({
            colSpan: {
              mdTo2xl: 4,
              smDown: 12,
            },
          })}
        >
          <Card variant="outline">
            <Card.Header
              icon={
                <Image src="/logos/blog/hashnode.png" width={28} height={28} alt="hashnode-logo" className={blogLogo} />
              }
            >
              Hashnode
            </Card.Header>
            <Card.Body>Subscribe to my tech newsletter & receive emails whenever I publish something new.</Card.Body>
            <Card.Footer>
              <Button variant="outline" as="a" href="https://jameswalsh.hashnode.dev/newsletter">
                Join Newsletter
              </Button>
            </Card.Footer>
          </Card>
        </div>
        <div
          className={gridItem({
            colSpan: {
              mdTo2xl: 4,
              smDown: 12,
            },
          })}
        >
          <Card variant="outline">
            <Card.Header
              icon={
                <Image src="/logos/blog/dev-to.png" width={28} height={28} alt="dev-to-logo" className={blogLogo} />
              }
            >
              DEV.to
            </Card.Header>
            <Card.Body>All my posts are made available on DEV, my favorite blogging community.</Card.Body>
            <Card.Footer>
              <Button variant="outline" as="a" href={`https://dev.to/${HANDLE}`}>
                Follow on DEV
              </Button>
            </Card.Footer>
          </Card>
        </div>
        <div
          className={gridItem({
            colSpan: {
              mdTo2xl: 4,
              smDown: 12,
            },
          })}
        >
          <Card variant="outline">
            <Card.Header
              icon={
                <Image src="/logos/blog/substack.png" width={28} height={28} alt="hashnode-logo" className={blogLogo} />
              }
            >
              Substack
            </Card.Header>
            <Card.Body>
              My substack focuses on non-technical subjects & life outside of corporate. <i>Coming soon!</i>
            </Card.Body>
            <Card.Footer>
              <Button variant="outline" as="a" href="https://aboveandbelow.substack.com">
                Subscribe
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  )
}
