/**
 * Browser-safe failure vocabulary of the configuration surfaces this package
 * serves. The redacted views themselves live with their seam in
 * `@deepseek-ai/dsh-settings/types`, whose Cordis event declarations already
 * register that file for the Client compilation face.
 *
 * @module @deepseek-ai/dsh-api-settings-controller/types
 */

declare module '@deepseek-ai/dsh-typert-protocol' {
  interface RemoteErrorDetailsMap {
    /** Only an owner browser may inspect or run credential flows. */
    'authorization/owner-required': {}
    /** The flow failed; provider errors may contain secrets and are not forwarded. */
    'authorization/failed': {}
    /**
     * Every seam refusal that is not a stale write: an unregistered or malformed
     * namespace, a read-only provider, schema validation, storage.
     */
    'settings/rejected': { readonly ns: string }
    /**
     * The stored revision moved after the caller read it. Its own outcome rather
     * than an invalid request: the caller must re-read and re-apply.
     */
    'settings/conflict': { readonly ns: string; readonly expected: number; readonly actual: number }
    /**
     * The provider refused a valid credential write, for example because the
     * stored document no longer parses. The details name only the reference,
     * never the value.
     */
    'credential/rejected': { readonly ref: string }
  }
}

/** Confirmation that the settings document was handed to the native editor. */
export interface SettingsDocumentOpenValue {
  readonly opened: true
}

/** Metadata for a registered flow, without credential contents. */
export interface AuthorizationFlowView {
  key: string
  label: string
  methods: readonly { id: string; label: string }[]
  inFlight: boolean
  configured: boolean
  recordKind?: 'grant' | 'api-key'
}

/** A question on the initiating browser's private stream. */
export type AuthorizationPromptView =
  | { kind: 'text' | 'secret'; message: string; placeholder?: string }
  | { kind: 'select'; message: string; options: readonly { id: string; label: string; description?: string }[] }

/** Stream-local question ids prevent a delayed answer from reaching a subsequent prompt. */
export type AuthorizationFrame =
  | { kind: 'notice'; notice: { message: string; url?: string; code?: string } }
  | { kind: 'prompt'; id: number; prompt: AuthorizationPromptView }
  | { kind: 'withdraw'; id: number }
  | { kind: 'done'; status: 'authorized' | 'cancelled' }

/** Answer to one pending prompt on the same stream. */
export interface AuthorizationAnswer {
  id: number
  value: string
}
