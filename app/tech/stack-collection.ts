import { TimelineCollectionRecord } from './types'

export const stackCollection: TimelineCollectionRecord = {
  frontend: [
    {
      title: 'JavaScript',
      description: `I still find it incredible that the worlds most popular programming languages was written in just 10 days.
                    Writing JS has been the bread & butter of my own career & my appreciation for it has grown as I've
                    contended with both it's good, & bad parts. I believe
                    that JS is at its best when written in composable, declarative way. My favorite resources on JS
                    are 'You Don't Know JS' & Professor Frisby's Mostly Adequate Guide to Functional Programming.`, // cspell:disable-line
      imageLink: '/logos/tech/javascript.webp',
    },
    {
      title: 'Typescript',
      description: `I'm a firm-believer that a carefully crafted strong type system
                    improves code quality, ability to refactor, readability, & your overall understanding of
                    modules developed by other teams & developers. I'm a strong advocate for types & compilers, as well
                    as static code analysis. My favorite resource for learning more about typescript is
                    Type Level Typescript by Gabriel Vergnaud.`,
      imageLink: '/logos/tech/typescript.webp',
    },
    {
      title: 'React',
      description: `What can I say, React is still G.O.A.T IMO. This whole website was built using React, and honestly
                    working in React has defined the bulk of my career thus far. I'll be singing the praises of composability,
                    JSX, and the expressiveness that React offers for years to come.`,
      imageLink: '/logos/tech/react.webp',
    },
  ],
  backend: [
    {
      title: 'Next.js',
      description: `Full-stack React, SSR, and RSC, give an effective replacement to both tRPC & gRPC are what
                    make Next.js the most compelling full-stack technology framework for indie developers who want
                    to get off the ground running with everything they need, but with the frontend cloud at the top
                    of their mind. Progressive enhancement, full compatibility with edge functions, fast load
                    times, & intelligent asset caching are all apart of my decision for choosing Next.js as my
                    go to starter stack. It should come as no surprise that this portfolio site is written using Next.js.
                    It keeps me productive. I cant say enough great things about it.`,
      imageLink: '/logos/tech/nextjs.webp',
    },
    {
      title: 'Node.js / Express',
      description: `What can I say I just really like writing Javascript! No but seriously. Node.js + Express are an
                    amazing combo for folks who don't want the overhead of context switching between frontend & backend
                    work & want a lightweight batteries included mechanism to begin writing a network layer. During my
                    time at Pluralsight, much of years 2-4 were spent scaling 2 Node.js services to be able
                    to service high profile customers like JPMC, Chevron, AMEX, & more. Node.js never got in my way,
                    especially when paired with a sensible database abstraction behind it.`,
      imageLink: '/logos/tech/nodejs.webp',
    },
    {
      title: 'Ruby on Rails',
      description: `Ruby on Rails was the first technology stack I ever used professionally, & in hindsight I feel
                    particularly lucky that I got to use such an expressive, concise, productive, opinionated stack
                    as a new engineer. While I look back on my time with Ruby romantically, thinking about how
                    quickly my entire team could spin up MVPs for CRUD applications with ease, I have to confess that
                    I do not miss ActiveRecord at all, nor the "Model" in in MVC much at all.`,
      imageLink: '/logos/tech/rails.webp',
    },
  ],
  databases: [
    {
      title: 'PostgreSQL',
      description: `Whether your storing your data as traditional SQL or JSON style NoSQL, normalized, de-normalized,
                    with key constraints, without key constraints, Postgres always has you covered. Postgres'
                    world-class flexibility make it the first querying language that I reach for on professional teams.`,
      imageLink: '/logos/tech/postgres.webp',
    },
    {
      title: 'Turso',
      description: `Turso is proving that yes, SQLite can scale, and that you don't need to pay hefty amounts of money to get there.
                    Turso does a lot in terms of providing feature parody
                    with DB services like PlanetScale (below), but with a fraction of the complexity. Turso is ready for edge computing,
                    has support for rapid prototyping via its "db push" functionality and works anywhere that libsql database driver works,
                    making it a great choice to pair with popular SQL libraries across the web stack. My favorite part of using turso is that it actually takes less than 10 seconds to get started. It's brilliant.`,
      imageLink: '/logos/tech/turso.webp',
    },
    {
      title: 'PlanetScale DB',
      description: `While Postgres has my heart, MySQL was the first database technology I ever used. MySQL powered my
      early web development career. And it hasn't slowed down either, as companies like PlanetScale continue to innovate in the space. PlanetScale's highly competitive pricing, disruptive approach to git style database branching, &
                    generous free tier make it my go-to hosted db platform for all my indie dev side project
                    ideas. Migrations in PlanetScale are so easy to work with that it feels like the logical choice
                    for teams that want to iterate quickly, & don't know the exact data shape they're working with
                    at the start of a new project. First class support for popular
                    Node.js libraries like Prisma, & Drizzle are all icing on top. MySQL remains one of my top database choices, & continues to power many of the
                    APIs I use both in my side projects & professionally. MySQL has earned its place as the obvious top
                    contender to PostgreSQL in OSS db popularity.`,
      imageLink: '/logos/tech/planetscale-white.webp',
    },
  ],
  eventing: [
    {
      title: 'RabbitMQ',
      description: `The 1st time I ever worked in a micro-services architecture much of my day was spent writing
                    subscribers & publishers to power the eventual consistency that would allow totally separate
                    domains to talk to one another with grace. Rabbit is a no-brainer, & a perfect fit with Node.js
                    which was fundamentally built on top of an 'event loop' architecture. My only complaint with
                    rabbit is that h&ling dead-lettering can be cumbersome & hard, which leads us to kafka.`,
      imageLink: '/logos/tech/rabbitmq.webp',
    },
    {
      title: 'Apache Kafka',
      description: `Where RabbitMQ struggles, Kafka holds strong, but can take significantly more effort to setup &
                    get right. Kafka consumers can do what RabbitMQ consumers cannot in that they re-read history from
                    the beginning of time, getting you every event that was ever fired. The real time analytics
                    abilities from tools that are built on top of kafka are second to none, & powered
                    analytics dashboards I helped create in Scala during the 2020 global pandemic.`,
      imageLink: '/logos/tech/kafka.webp',
    },
    {
      title: 'AWS Simple Queue Service',
      description: `SQS is my favorite eventing platform for simple pub/sub architectures. While it feels less grown
                    up compared to its rabbit & kafka counterparts, its also more lightweight & by far the easiest
                    to get started with since its a 1st party hosted solution.`,
      imageLink: '/logos/tech/sqs.webp',
    },
  ],
  devtools: [
    {
      title: 'VSCode',
      description: `If you're still not using VS Code yet, schedule some time with me. As a long time JetBrains
                    enthusiast, VS Code has everything I need with a fraction of the CPU & RAM cost & a better UX.
                    Neither full fledge IDE, nor simple text-editor, VS Code lets you be whatever you
                    configure it to be. There is real elegance in that. The cherry on top is that there is no better
                    remote pairing experience than the LiveShare offering from Microsoft. I highly recommend it for
                    distributed teams who want to occasionally pair & mob program.`,
      imageLink: '/logos/tech/vscode.webp',
    },
    {
      title: 'Oh My ZSH',
      description: `Whether or not I'm on Mac, WSL, or Linux you can bet that I'm taking ZSH, along with all my custom
                    ZSH configurations, aliases, & plugins with me. ZSH is bash supercharged, & makes working out of the
                    terminal feel premium.`,
      imageLink: '/logos/tech/ohmyzsh.webp',
    },
    {
      title: 'iTerm 2',
      description: `A great modern terminal that doesn't get in your way, doesn't track you with data analytics,
                    & doesn't require you to login. Its tried, true, & stable. Keep being you, iTerm.`,
      imageLink: '/logos/tech/iterm2.webp',
    },
    {
      title: 'TablePlus',
      description: `Compatible with all major OSS querying languages, I love TablePlus for all the same reasons I love
                    VS Code. While its not a full fledge IDE like Data Grip, it helps me do what I need to do while
                    managing a minimal, simple user interface that really puts your SQL data front & center & gets
                    everything else out of your way.`,
      imageLink: '/logos/tech/tableplus.webp',
    },
    {
      title: 'Bruno',
      description: `Bruno does its job really well, however unlike it's competition (i.e Postman & Insomnia), its free,
                    open source, can be checked into git, and bases collections on your local file system without
                    layering on lots of extra pricey abstractions, bells, & whistles. A great API management tool gets
                    you back into your browser or editor as fast as possible, & that is Bruno at its core.`,
      imageLink: '/logos/tech/bruno.webp',
    },
  ],
  principles: [
    {
      title: 'Kanban with Linear',
      description: `Ive been an outspoken critic of the way that most implement agile. The agile manifesto
                    (which was written about 30 minutes up the road from my childhood home) is
                    only 4 short simple sentences. Yet the meaning largely appears to be lost as teams spend copious
                    amounts of time managing sAFE, SCRUM, & spending significant energy figuring out how long something is
                    going to take, rather than spending time delivering customer value. Linear reduces waste, cuts
                    through the cruft, and is hands down the most powerful, simple, and fun project management
                    tool I've ever used.`,
      imageLink: '/logos/tech/linear-app-logo.webp',
    },
    {
      title: 'Atomic Design Principles',
      description: `Brad Frost is responsible for getting me interested in Design Systems. Atomic Design lays out principles by which I believe all great design systems
                    can be built upon for scale, cleanliness, & a stellar developer experience.
                    Both on the design systems that I have had a h& in building, & design systems I choose to use,
                    I look for atomic layers of UI that can easily be structured into eventual full pages & layouts.
                    Thank you Brad!`,
      imageLink: '/logos/tech/atomic-design.webp',
    },
    {
      title: 'Test-Driven Development',
      description: `TDD is a discipline I strive to practice with relative consistency in my own career as its led
                    to better overall code quality, helps me go faster, & most importantly helps me think through
                    features at the smallest level possible. I view the benefits of TDD to be largely at design &
                    development time, in helping me think through the structure of my thoughts to deliver value.
                    Those returns diminish when the test is written second. TDD helps me figure out what code
                    I'm trying to write. When you've already written the code. the tests are only there to make sure
                    code that comes after it meets a specification. TDD is double entry book keeping. Its measuring
                    twice to cut once. Its a discipline that for me has been non-negotiable.`,
      imageLink: '/logos/tech/tdd.webp',
    },
  ],
}
