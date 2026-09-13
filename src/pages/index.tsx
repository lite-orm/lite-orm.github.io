import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const capabilities = [
  ['Compile-time first', 'SQL, parameters, and result shapes are validated before runtime.'],
  ['Explicit JDBC', 'Generated Mappers call one small SqlExecutor contract with no hidden session.'],
  ['Spring-ready', 'Named DataSource domains, transactions, and routing stay under Spring ownership.'],
];

export default function Home(): ReactNode {
  return (
    <Layout title="Compile-time SQL mapping for Java" description="LiteORM is a compile-time SQL Mapper for explicit Java and JDBC systems.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>JAVA · JDBC · COMPILE-TIME</p>
            <Heading as="h1">SQL mapping that stays visible.</Heading>
            <p className={styles.lead}>
              LiteORM generates ordinary Java Mappers at compile time, then executes them through a fixed, explicit JDBC lifecycle.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--primary button--lg" to="/docs/user/getting-started">Get started</Link>
              <Link className="button button--secondary button--lg" to="/docs/user/architecture">Explore the architecture</Link>
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
        <section className={styles.capabilities}>
          <div className="container">
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
      </main>
    </Layout>
  );
}
