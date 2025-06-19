'use client'

import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'

export default function AboutMe() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="who-i-am">
        <AccordionTrigger>Who I Am 🤙</AccordionTrigger>
        <AccordionContent className="my-4">
          Growing up I was drawn to music, art, video games, technology, & writing - creative pursuits that naturally
          led me to web development. I&apos;ve always been fascinated by computers, from playing The Oregon Trail on
          floppy disks to Runescape on our family PC. The intersection of technology and artistic expression still
          captivates me to this day. When I&apos;m not writing software, I&apos;m usually headed to the mountains for an
          adrenaline filled descent on the back of a mountain bike or snowboard. 🏂
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="how-i-got-started">
        <AccordionTrigger>How I Got Started 💻</AccordionTrigger>
        <AccordionContent className="my-4">
          In summer 2014, while taking a break from a business major, I had a pivotal moment. The night I built my first
          gaming PC, I had the itch to build a throwaway website. Inspired by a coworker&apos;s journey into software
          development, I spent that summer learning HTML, CSS, JavaScript, & Ruby on Rails. By fall, I had enrolled in
          DevMountain&apos;s full-stack boot camp, and by January 2015, I landed my first role as an Associate Engineer
          at IntegraCore <i>(now Maersk)</i>. There, I was fortunate to be mentored by exceptional Ruby on Rails
          developers who shaped my foundations. That beginning has grown into a decade-long full-stack career where
          I&apos;m still amazed by how much there is to learn and create.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="today">
        <AccordionTrigger>Today 🎧</AccordionTrigger>
        <AccordionContent className="my-4">
          Today I&apos;m a seasoned full-stack software engineer with a passion for frontend development. Through both
          successes and challenges, I&apos;ve learned that while modern software is never truly &quot;done&quot;,
          it&apos;s the people behind it and processes that drive success. I&apos;ve scaled Node.js APIs from launch to
          enterprise-level and helped craft Design Systems. As we enter the age of AI, I&apos;m excited by how these new
          tools can enhance our productivity. The landscape keeps evolving, and I&apos;m thrilled to continue growing
          alongside it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
