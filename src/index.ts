/**
 * Main exports for throttler types and interfaces.
 * @description
 * This module exports all throttler-related types, interfaces and models for rate limiting functionality.
 * 
 * Key Features:
 * - Complete type definitions for throttler configuration
 * - Interface exports for storage backends and options
 * - Model exports for throttler implementation
 * - Namespace organization for clean imports
 * 
 * Exports:
 * - IThrottler namespace: Contains interfaces for:
 *   - Storage backend configuration (Redis, in-memory)
 *   - Rate limiting options and settings
 *   - Module configuration and initialization
 *   - Factory patterns for dynamic config
 * 
 * - Throttler namespace: Contains models for:
 *   - Core rate limiting functionality
 *   - Storage backend implementations
 *   - Utility types and helpers
 *   - Type definitions for parameters
 * 
 * Use Cases:
 * - API rate limiting configuration
 * - DDoS protection setup
 * - Resource usage control
 * - Request throttling implementation
 * 
 * @example
 * ```typescript
 * import { IThrottler, Throttler } from '@hsuite/throttler-types';
 * 
 * // Configure throttling options
 * const options: IThrottler.IOptions = {
 *   enabled: true,
 *   storage: IThrottler.IStorage.REDIS
 * };
 * ```
 * @compodoc
 * @category Modules
 * @subcategory Throttling
 */

export * from './interfaces/throttler.namespace'
export * from './models/throttler.namespace'