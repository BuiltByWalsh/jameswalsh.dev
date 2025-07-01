import { stackCollection } from './stack-collection'

describe('stack/stack-collection', () => {
  it('contains records for all collection types', () => {
    expect(Object.keys(stackCollection)).toEqual([
      'frontend',
      'backend',
      'databases',
      'eventing',
      'devtools',
      'principles',
    ])
  })

  it.each([
    ['JavaScript', 0],
    ['Typescript', 1],
    ['React', 2],
  ])('contains a frontend record for %s', (entryTitle, index) => {
    expect(stackCollection.frontend[index].title).toEqual(entryTitle)
  })

  it.each([
    ['Next.js', 0],
    ['Node.js / Express', 1],
    ['Ruby on Rails', 2],
  ])('contains a backend record for %s', (entryTitle, index) => {
    expect(stackCollection.backend[index].title).toEqual(entryTitle)
  })

  it.each([
    ['PostgreSQL', 0],
    ['Turso', 1],
    ['PlanetScale DB', 2],
  ])('contains a database record for %s', (entryTitle, index) => {
    expect(stackCollection.databases[index].title).toEqual(entryTitle)
  })

  it.each([
    ['RabbitMQ', 0],
    ['Apache Kafka', 1],
    ['AWS Simple Queue Service', 2],
  ])('contains an eventing record for %s', (entryTitle, index) => {
    expect(stackCollection.eventing[index].title).toEqual(entryTitle)
  })

  it.each([
    ['VSCode', 0],
    ['Oh My ZSH', 1],
    ['iTerm 2', 2],
    ['TablePlus', 3],
    ['Bruno', 4],
  ])('contains a devtools record for %s', (entryTitle, index) => {
    expect(stackCollection.devtools[index].title).toEqual(entryTitle)
  })

  it.each([
    ['Kanban with Linear', 0],
    ['Atomic Design Principles', 1],
    ['Test-Driven Development', 2],
  ])('contains a principles record for %s', (entryTitle, index) => {
    expect(stackCollection.principles[index].title).toEqual(entryTitle)
  })
})
