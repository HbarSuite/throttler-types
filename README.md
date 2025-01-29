# @hsuite/throttler-types

Type definitions and interfaces for the HbarSuite Rate Limiting system.

## Description

The `@hsuite/throttler-types` package provides TypeScript type definitions, interfaces, and models for implementing rate limiting functionality in the HbarSuite ecosystem. It serves as the foundation for the `@hsuite/throttler` package and other related packages by defining the contract for rate limiting operations, storage backends, and configuration options.

## Features

- 🔄 Comprehensive rate limiting type definitions
- 📊 Flexible storage backend options (Redis, In-Memory)
- ⚙️ Async configuration support
- 🏭 Factory pattern integration
- 🔌 NestJS module integration
- ⚡ Dynamic configuration capabilities
- 🛡️ DDoS protection configuration types

## Installation

```bash
npm install @hsuite/throttler-types
```

## Usage

### Basic Configuration

```typescript
import { IThrottler } from '@hsuite/throttler-types';

// Configure basic throttling options
const options: IThrottler.IOptions = {
  enabled: true,
  settings: {
    ttl: 60,    // Time window in seconds
    limit: 100  // Maximum requests per window
  },
  storage: IThrottler.IStorage.REDIS,
  redis: {
    host: 'localhost',
    port: 6379
  }
};
```

### Async Configuration

```typescript
import { IThrottler } from '@hsuite/throttler-types';

// Implement factory for dynamic configuration
class ConfigFactory implements IThrottler.IOptionsFactory {
  async createThrottlerOptions(): Promise<IThrottler.IOptions> {
    return {
      enabled: process.env.THROTTLING_ENABLED === 'true',
      settings: {
        ttl: parseInt(process.env.THROTTLE_TTL || '60'),
        limit: parseInt(process.env.THROTTLE_LIMIT || '100')
      },
      storage: IThrottler.IStorage.REDIS,
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
      }
    };
  }
}
```

### NestJS Module Integration

```typescript
import { ThrottlerModule } from '@hsuite/throttler';
import { IThrottler } from '@hsuite/throttler-types';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        enabled: config.get('THROTTLE_ENABLED'),
        settings: {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT')
        },
        storage: IThrottler.IStorage.REDIS,
        redis: config.get('REDIS_CONFIG')
      }),
      inject: [ConfigService]
    })
  ]
})
```

## API Reference

### IThrottler Namespace

The main namespace containing all throttler-related interfaces and types.

#### Storage Options

```typescript
enum IStorage {
  REDIS = 'redis',    // Redis storage backend
  DEFAULT = 'default' // In-memory storage backend
}
```

#### Configuration Interface

```typescript
interface IOptions {
  enabled: boolean;           // Enable/disable throttling
  settings: {
    ttl: number;             // Time window in seconds
    limit: number;           // Max requests per window
  };
  storage: IStorage;         // Storage backend selection
  redis: RedisClientOptions; // Redis configuration
}
```

#### Factory Interfaces

```typescript
interface IOptionsFactory {
  createThrottlerOptions(): Promise<IOptions> | IOptions;
}

interface IModuleAsyncOptions {
  useExisting?: Array<Type<any>>;
  useClass?: Type<any>;
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}
```

## Documentation

### Compodoc Documentation

For detailed API documentation, you can generate and view it using [Compodoc](https://compodoc.app/):

1. Generate and serve the documentation:
```bash
yarn compodoc
```

2. Generate documentation with coverage information:
```bash
yarn compodoc:coverage
```

## Use Cases

- API rate limiting implementation
- DDoS protection configuration
- Resource usage control
- Request throttling in distributed systems
- Multi-tenant rate limiting
- Microservices protection

## License

This package is part of the HbarSuite ecosystem and is covered by its license terms.

---

<p align="center">
  Built with ❤️ by the HbarSuite Team<br>
  Copyright © 2024 HbarSuite. All rights reserved.
</p>