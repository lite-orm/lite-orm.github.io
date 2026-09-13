import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const capabilities = [
  ['Compile-time first', 'SQL, parameters, and result shapes are validated before runtime.'],
  ['Explicit JDBC', 'Generated Mappers call one small SqlExecutor contract with no hidden session.'],
  ['Spring-ready', 'Named DataSource domains, transactions, and routing stay under Spring ownership.'],
  ['Readable generated code', 'Inspect the generated Mapper with ordinary Java tools and debuggers.'],
  ['Typed escape hatches', 'Use focused providers, binders, row mappers, and interceptors when needed.'],
  ['Migration-aware', 'Move supported MyBatis patterns incrementally without adopting a hidden session model.'],
];

const workflow = [
  ['01', 'Declare', 'Write a Mapper interface and explicit SQL in annotations or XML.'],
  ['02', 'Compile', 'The processor validates parameters, result shapes, and dynamic SQL with javac.'],
  ['03', 'Generate', 'A concrete Mapper implementation is emitted as ordinary Java source.'],
  ['04', 'Execute', 'SqlExecutor owns one visible JDBC lifecycle from connection to cleanup.'],
];

export default function Home(): ReactNode {
  return (
    <Layout title="Compile-time SQL mapping for Java" description="LiteORM is a compile-time SQL Mapper for explicit Java and JDBC systems.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>JAVA · JDBC · COMPILE-TIME</p>
            <Heading as="h1">lite-orm</Heading>
            <p className={styles.lead}>
              Compile-time SQL mapping for explicit Java and JDBC systems.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/user/getting-started">Quick Start</Link>
              <Link className="button button--secondary button--lg" href="https://github.com/lite-orm/lite-orm">View on GitHub</Link>
            </div>
            <div className={styles.codePanel}>
              <span className={styles.codeLabel}>A Mapper becomes ordinary Java</span>
              <pre><code>{`@Mapper
interface UserMapper {
  @Select("select id, name from users where id = #{id}")
  User findById(@Param("id") long id);
}`}</code></pre>
            </div>
          </div>
        </section>
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>WHY LITEORM</p>
              <Heading as="h2">A smaller surface area for serious SQL.</Heading>
              <p>Keep SQL close to the code, move stable decisions into the compiler, and leave runtime behavior visible to your team.</p>
            </div>
            <div className={styles.promiseGrid}>
              <article><strong>Less magic</strong><span>No session, proxy, cache, or runtime XML interpreter.</span></article>
              <article><strong>Earlier feedback</strong><span>Invalid signatures and unsupported expressions fail during compilation.</span></article>
              <article><strong>Clear ownership</strong><span>Spring owns DataSources and transactions; LiteORM owns mapping and execution.</span></article>
            </div>
          </div>
        </section>
        <section className={styles.workflow}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>THE PIPELINE</p>
              <Heading as="h2">From interface to JDBC, without a black box.</Heading>
            </div>
            <div className={styles.workflowGrid}>
              {workflow.map(([number, title, text]) => (
                <article className={styles.workflowStep} key={number}>
                  <span>{number}</span><Heading as="h3">{title}</Heading><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.capabilities}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>BUILT FOR THE WAY YOU SHIP</p>
              <Heading as="h2">Focused capabilities. Composable when you need more.</Heading>
            </div>
            <div className={styles.grid}>
              {capabilities.map(([title, text], index) => (
                <article className={styles.card} key={title}>
                  <span className={styles.cardIndex}>0{index + 1}</span>
                  <Heading as="h2">{title}</Heading>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.integration}>
          <div className="container">
            <div className={styles.integrationPanel}>
              <div>
                <p className={styles.kicker}>START WITH YOUR STACK</p>
                <Heading as="h2">Standalone JDBC or Spring Boot.</Heading>
                <p>Use the same generated Mapper contract in a small service, a modular monolith, or a multi-DataSource Spring application.</p>
              </div>
              <div className={styles.integrationLinks}>
                <Link to="/docs/user/getting-started">Installation <span>→</span></Link>
                <Link to="/docs/user/spring/spring-boot">Spring Boot guide <span>→</span></Link>
                <Link to="/docs/user/migration/from-mybatis">MyBatis migration <span>→</span></Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.finalCta}>
          <div className="container">
            <Heading as="h2">Make the SQL path obvious.</Heading>
            <p>Read the contract, compile a first Mapper, and decide where LiteORM fits your architecture.</p>
            <Link className="button button--primary button--lg" to="/docs/user/getting-started">Read the getting started guide</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
