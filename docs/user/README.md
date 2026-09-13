# LiteORM User Documentation

LiteORM documentation is organized by the task or module a user is working with. Start with the quick start, then open only the module-specific guide you need.

## Start Here

- [Quick start](https://github.com/lite-orm/lite-orm/blob/main/docs/user/getting-started.md): add LiteORM, define a Mapper, and configure annotation processing.
- [Architecture](https://github.com/lite-orm/lite-orm/blob/main/docs/user/architecture.md): understand the compile-time and runtime boundaries.

## Core

- [Core guides](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/README.md): compilation, mapping, extensions, and standalone runtime.
- [Choosing a value or row mapping](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/mapping.md): choose between standard routing, parameter binders, generated result mapping, and row mappers.
- [Choosing an extension](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/extensions.md): select the narrowest provider, binder, mapper, interceptor, decorator, or raw-JDBC boundary.
- [Standalone JDBC](https://github.com/lite-orm/lite-orm/blob/main/docs/user/core/standalone.md): assemble generated Mappers without Spring.

## Integrations

- [Spring guides](https://github.com/lite-orm/lite-orm/blob/main/docs/user/spring/README.md): Spring-owned assembly and transaction participation.
- [Spring Boot](https://github.com/lite-orm/lite-orm/blob/main/docs/user/spring/spring-boot.md): register Mapper packages and participate in Spring transactions.

## Migration

- [Migration guides](https://github.com/lite-orm/lite-orm/blob/main/docs/user/migration/README.md): compatibility-first migration entry point.
- [Migrating from MyBatis](https://github.com/lite-orm/lite-orm/blob/main/docs/user/migration/from-mybatis.md): migrate supported Mapper declarations and replace unsupported runtime features explicitly.

Normative behavior is defined in the [reference documentation](https://github.com/lite-orm/lite-orm/blob/main/docs/README.md#reference). Active implementation work is tracked in GitHub Issues rather than user guides.
