import { ModuleMetadata, Type } from "@nestjs/common"
import { Config } from "cache-manager"
import { RedisClientOptions } from "redis"

/**
 * Namespace containing throttler-related interfaces and types for rate limiting functionality.
 * @description
 * The IThrottler namespace provides:
 * - Storage backend options (Redis, in-memory)
 * - Configuration interfaces for throttling settings
 * - Factory patterns for dynamic configuration
 * - Module initialization options
 * 
 * Key Features:
 * - Flexible storage backends
 * - Configurable rate limiting
 * - Async configuration support
 * - Dependency injection integration
 * 
 * Use Cases:
 * - API rate limiting
 * - DDoS protection
 * - Resource usage control
 * - Request throttling
 * 
 * @example
 * ```typescript
 * // Basic throttler configuration
 * const options: IThrottler.IOptions = {
 *   enabled: true,
 *   settings: {
 *     ttl: 60,
 *     limit: 100
 *   },
 *   storage: IThrottler.IStorage.REDIS,
 *   redis: {
 *     host: 'localhost',
 *     port: 6379
 *   }
 * };
 * ```
 * @compodoc
 * @category Interfaces
 * @subcategory Throttling
 */
export namespace IThrottler {
    /**
     * Available storage options for persisting throttling data.
     * @description
     * Defines supported storage backends:
     * - REDIS: Distributed Redis storage for scalability
     * - DEFAULT: Local memory storage for simple deployments
     * 
     * Use Cases:
     * - Choose Redis for distributed systems
     * - Use Default for single-instance apps
     * 
     * @example
     * ```typescript
     * storage: IThrottler.IStorage.REDIS // For Redis
     * storage: IThrottler.IStorage.DEFAULT // For in-memory
     * ```
     * @compodoc
     * @category Enums
     * @subcategory Storage
     */
    export enum IStorage {
        REDIS = 'redis',
        DEFAULT = 'default'
    }

    /**
     * Configuration options for throttler behavior and storage.
     * @description
     * Provides complete throttler configuration including:
     * - Enable/disable functionality
     * - Rate limiting parameters
     * - Storage backend selection
     * - Redis connection settings
     * 
     * Key Settings:
     * - TTL: Time window for rate limiting
     * - Limit: Max requests per window
     * - Storage: Backend selection
     * - Redis: Connection config
     * 
     * @example
     * ```typescript
     * const options: IThrottler.IOptions = {
     *   enabled: true,
     *   settings: { ttl: 60, limit: 100 },
     *   storage: IThrottler.IStorage.REDIS,
     *   redis: { host: 'localhost' }
     * };
     * ```
     * @compodoc
     * @category Interfaces  
     * @subcategory Configuration
     */
    export interface IOptions {
        enabled: boolean
        settings: {
            ttl: number
            limit: number
        }
        storage: IStorage
        redis: RedisClientOptions & Config
    }

    /**
     * Factory interface for dynamic throttler configuration.
     * @description
     * Enables runtime configuration generation through:
     * - Async/sync option creation
     * - Dynamic settings calculation
     * - Environment-based config
     * - Custom logic integration
     * 
     * Use Cases:
     * - Load config from external source
     * - Calculate limits dynamically
     * - Environment-specific settings
     * 
     * @example
     * ```typescript
     * class ConfigFactory implements IOptionsFactory {
     *   async createThrottlerOptions(): Promise<IOptions> {
     *     return {
     *       enabled: process.env.THROTTLING_ENABLED === 'true',
     *       settings: await this.loadSettings()
     *     };
     *   }
     * }
     * ```
     * @compodoc
     * @category Interfaces
     * @subcategory Factories
     */
    export interface IOptionsFactory {
        createThrottlerOptions(): Promise<IOptions> | IOptions;
    }

    /**
     * Async module configuration options for throttler initialization.
     * @description
     * Supports various configuration patterns:
     * - Existing factory injection
     * - New factory class creation
     * - Factory function usage
     * - Dependency injection
     * 
     * Configuration Methods:
     * - useExisting: Reuse factory
     * - useClass: Create new factory
     * - useFactory: Use factory function
     * - inject: Provide dependencies
     * 
     * @example
     * ```typescript
     * @Module({
     *   imports: [
     *     ThrottlerModule.forRootAsync({
     *       imports: [ConfigModule],
     *       useFactory: (config: ConfigService) => ({
     *         ttl: config.get('THROTTLE_TTL'),
     *         limit: config.get('THROTTLE_LIMIT')
     *       }),
     *       inject: [ConfigService]
     *     })
     *   ]
     * })
     * ```
     * @compodoc
     * @category Interfaces
     * @subcategory Module Configuration
     */
    export interface IModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
        /**
         * An existing IOptionsFactory type to be used.
         * @type {Array<Type<any>>}
         * @description Array of existing factory types to generate throttler options
         */
        useExisting?: Array<Type<any>>;

        /**
         * A class to be instantiated as a IOptionsFactory.
         * @type {Type<any>}
         * @description Class that implements IOptionsFactory interface
         */
        useClass?: Type<any>;

        /**
         * A factory function that returns throttler options.
         * @param {...any[]} args - Any arguments that the factory might need.
         * @returns {Promise<IOptions> | IOptions} A promise that resolves to throttler options or the options directly.
         * @description Factory function for generating throttler configuration
         */
        useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;

        /**
         * Optional list of providers to be injected into the context of the Factory function.
         * @type {any[]}
         * @description Dependencies to be injected into the factory function
         */
        inject?: any[];
    }
}
