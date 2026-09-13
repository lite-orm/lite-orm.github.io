# LiteORM Documentation

This is the canonical documentation index. User-facing guides are grouped by product area under `docs/user/`; normative contracts, project records, and contributor material remain separate so readers can distinguish guidance from guarantees and internal workflow.

## User Documentation

### Start Here

- [`user/README.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/README.md): user documentation map.
- [`user/getting-started.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/getting-started.md): installation, annotation processing, the first Mapper, and runtime assembly.
- [`user/architecture.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/architecture.md): compile-time and runtime architecture.

### Core

- [`user/core/README.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/README.md): Core guide index.
- [`user/core/mapping.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/mapping.md): standard JDBC routing, generated result mapping, parameter binders, and row mappers.
- [`user/core/extensions.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/extensions.md): decision guide for typed extension points and raw JDBC.
- [`user/core/standalone.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/standalone.md): standalone JDBC assembly and callback transactions.

### Integrations

- [`user/spring/README.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/spring/README.md): Spring guide index.
- [`user/spring/spring-boot.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/spring/spring-boot.md): Mapper registration, named DataSource binding, and Spring transactions.

### Migration

- [`user/migration/README.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/migration/README.md): migration guide index.
- [`user/migration/from-mybatis.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/migration/from-mybatis.md): manual migration from supported MyBatis patterns.
- [`user/migration/using-migration-skill.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/user/migration/using-migration-skill.md): install and invoke the migration skill.

## Reference

- [`reference/core-contract.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/reference/core-contract.md): supported Mapper, JDBC, failure, transaction, concurrency, and database-mapping behavior.
- [`reference/extensions.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/reference/extensions.md): exact Spring and typed extension contracts.
- [`reference/mybatis-compatibility.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/reference/mybatis-compatibility.md): supported, partial, and unsupported MyBatis behavior.
- [`../Design-Philosophy.md`](https://github.com/lite-orm/lite-orm/blob/main/Design-Philosophy.md): durable product principles and non-goals.
- [`../CONTEXT.md`](https://github.com/lite-orm/lite-orm/blob/main/CONTEXT.md): canonical project terminology and ownership.

## Architecture Decisions and Evidence

- [`adr/0001-separate-execution-outcome-from-transaction-completion.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/adr/0001-separate-execution-outcome-from-transaction-completion.md)
- [`adr/0002-keep-standard-jdbc-routing-fixed-in-core.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/adr/0002-keep-standard-jdbc-routing-fixed-in-core.md): fixed Core JDBC routing and explicit binder/row-mapper escape hatches.
- [`benchmarks/core-ga-baseline.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/benchmarks/core-ga-baseline.md): reproducible Core GA benchmark evidence.
- [`research/mybatis-3.5.19-compatibility-sources.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/research/mybatis-3.5.19-compatibility-sources.md): pinned primary-source evidence for the MyBatis compatibility matrix.
- [`research/mybatis-migration-skill-validation.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/research/mybatis-migration-skill-validation.md): evidence and claim boundary for migration skill validation.

## Project

- [`project/roadmap.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/project/roadmap.md): strategic delivery order. GitHub Issues own specifications and implementation status.
- [`project/release.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/project/release.md): reproducible release gates, signing, rollback, and governance.

## Contributor and Agent Documentation

- [`agent/project-context.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agent/project-context.md): repository context and module responsibilities.
- [`agent/engineering-guide.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agent/engineering-guide.md): engineering, testing, documentation, and commit conventions.
- [`agent/documentation-policy.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agent/documentation-policy.md): document types, ownership, and verification.
- [`agent/tooling.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agent/tooling.md): cross-agent workflow and rule discovery.
- [`agents/issue-tracker.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agents/issue-tracker.md): GitHub Issues conventions.
- [`agents/triage-labels.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agents/triage-labels.md): triage roles and labels.
- [`agents/domain.md`](https://github.com/lite-orm/lite-orm/blob/main/docs/agents/domain.md): domain-document workflow.

## Documentation Rules

- Root `README.md` and `README_cn.md` are short project entry points; only the Chinese root README is localized for now.
- User guides explain tasks and defer to reference contracts for normative behavior.
- Reference documents own stable guarantees and compatibility classifications.
- ADRs explain durable decisions; benchmarks record reproducible evidence.
- Contributor and agent documents describe repository workflow, not user-facing product behavior.
- Active specifications and delivery state belong in GitHub Issues.
- Every active document must be linked from this index or from a module README.
