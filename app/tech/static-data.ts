import type { Project, TimelineCollectionRecord } from './types'

export const projectsCollection: Project[] = [
  {
    title: 'SchoolAI Chrome Extension',
    description: `One of the founding team members behind SchoolAI's chrome Extension. Seamlessly integrates with your browser, meeting educators where they are.`,
    externalLink: {
      title: 'schoolai.com/chrome-extension',
      href: 'https://schoolai.com/chrome-extension',
    },
    imageLink: '/logos/employers/schoolai.jpg',
  },
  {
    title: 'Tomo TrueRate',
    description: `Early stage contributor to what would become TrueRate. TrueRate helps you compare mortgage lenders with numbers that speak for themselves.`,
    externalLink: {
      title: 'tomo.com/mortgage',
      href: 'https://tomo.com/mortgage/interest-rates-today',
    },
    imageLink: '/logos/employers/tomo.webp',
  },
  {
    title: 'Vasion Automate',
    description: `Integrating workflow, form capture, signature, & content management within 1 single SaaS solution powered by Single SPA & TurboRepo.`,
    externalLink: {
      title: 'vasion.com',
      href: 'https://vasion.com',
    },
    imageLink: '/logos/employers/vasion.webp',
  },
  {
    title: 'Podium Design System',
    description: `Beautiful, composable, fully accessible React Design System with theming & dark mode support. Publicly available with Storybook.`,
    externalLink: {
      title: 'brickyarddesign.com',
      href: 'https://brickyarddesign.com',
    },
    imageLink: '/logos/employers/podium.webp',
  },
  {
    title: 'Pluralsight Channels',
    description: `Organize content to meet your goals. For team development or to share learning journeys with the world.`,
    externalLink: {
      title: 'pluralsight.com',
      href: 'https://www.pluralsight.com/product/channels',
    },
    imageLink: '/logos/employers/pluralsight.webp',
  },
  {
    title: 'Git Collaborate',
    description: `Originally started as a 2016 hackathon project, git-collaborate is an OSS electron app for managing pair programming while rotating commit message authors.`,
    externalLink: {
      title: 'github.com',
      href: 'https://github.com/pluralsight/git-collaborate',
    },
    imageLink: '/logos/tech/github-white.webp',
  },
  {
    title: 'Shopify Integrations',
    description: `Supported & maintained Shopify API integrations for high-profile customers, & everyday small businesses who drop-ship.`,
    externalLink: {
      title: 'Maersk VisibleCSM',
      href: 'https://portal.visiblescm.com',
    },
    imageLink: '/logos/employers/maersk.webp',
  },
]

export const stackCollection: TimelineCollectionRecord = {
  web: [
    {
      title: 'Typescript',
      description: `Strong type systems improve code quality, refactoring ability, and readability. I'm a strong advocate for static analysis and compile-time safety.`,
      imageLink: '/logos/tech/typescript.webp',
    },
    {
      title: 'React',
      description: `Still the GOAT for me. This site is built with React. I love its composability, JSX, and expressiveness for building user interfaces.`,
      imageLink: '/logos/tech/react.webp',
    },
    {
      title: 'Next.js',
      description: `Full-stack React with SSR and RSC. Perfect for indie developers who want everything they need with frontend-first thinking. This portfolio uses Next.js.`,
      imageLink: '/logos/tech/nextjs.webp',
    },
    {
      title: 'Node.js / Express',
      description: `Great for avoiding context switching between frontend and backend. Lightweight and productive for building network layers.`,
      imageLink: '/logos/tech/nodejs.webp',
    },
    {
      title: 'Ruby on Rails',
      description: `My first professional stack. Expressive and productive for MVPs, though I don't miss ActiveRecord or the MVC model much.`,
      imageLink: '/logos/tech/rails.webp',
    },
  ],
  databases: [
    {
      title: 'PostgreSQL',
      description: `Flexible database that handles SQL, JSON, normalized and denormalized data. My go-to for professional teams.`,
      imageLink: '/logos/tech/postgres.webp',
    },
    {
      title: 'Turso',
      description: `Proves SQLite can scale without hefty costs. Great for edge computing and rapid prototyping with simple setup.`,
      imageLink: '/logos/tech/turso.webp',
    },
    {
      title: 'PlanetScale',
      description: `MySQL-based with git-style branching and generous free tier. Perfect for indie projects and quick iteration.`,
      imageLink: '/logos/tech/planetscale-white.webp',
    },
  ],
  eventing: [
    {
      title: 'RabbitMQ',
      description: `Perfect for microservices and eventual consistency. Works great with Node.js's event loop architecture.`,
      imageLink: '/logos/tech/rabbitmq.webp',
    },
    {
      title: 'Kafka',
      description: `Where RabbitMQ struggles, Kafka excels. Consumers can re-read history and power real-time analytics.`,
      imageLink: '/logos/tech/kafka.webp',
    },
    {
      title: 'AWS Simple Queue Service',
      description: `My favorite for simple pub/sub. Lightweight and easiest to get started with as a hosted solution.`,
      imageLink: '/logos/tech/sqs.webp',
    },
  ],
  devtools: [
    {
      title: 'Neovim + LazyVim',
      description: `Everything I need with fraction of CPU/RAM cost of the industry-standard electron counterparts. All without ever leaving the terminal.`,
      imageLink: '/logos/tech/neovim.webp',
    },
    {
      title: 'OhMyZSH',
      description: `ZSH supercharged with custom configurations, aliases, and plugins. Makes terminal work feel premium.`,
      imageLink: '/logos/tech/ohmyzsh.webp',
    },
    {
      title: 'Ghostty',
      description: `Modern terminal emulator with super simple configuration. Ghostty doesn't get in your way, track you, or require a login.`,
      imageLink: '/logos/tech/ghostty.webp',
    },
    {
      title: 'TablePlus',
      description: `Compatible with all major databases. Simple interface that puts SQL data front and center.`,
      imageLink: '/logos/tech/tableplus.webp',
    },
    {
      title: 'Bruno',
      description: `Free, open-source API management tool that can be checked into git. Gets you back to coding quickly.`,
      imageLink: '/logos/tech/bruno.webp',
    },
  ],
  principles: [
    {
      title: 'Linear',
      description: `Reduce waste and cut through agile cruft. The most powerful, simple project management tool I've used.`,
      imageLink: '/logos/tech/linear-app-logo.webp',
    },
    {
      title: 'Atomic Design Principles',
      description: `Brad Frost's principles for building scalable design systems with stellar developer experience.`,
      imageLink: '/logos/tech/atomic-design.webp',
    },
    {
      title: 'Test-Driven Development',
      description: `Discipline that improves code quality and helps think through features at the smallest level. Non-negotiable for me.`,
      imageLink: '/logos/tech/tdd.webp',
    },
  ],
}
