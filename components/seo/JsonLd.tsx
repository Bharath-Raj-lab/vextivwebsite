/**
 * JsonLd — Reusable JSON-LD structured data component.
 *
 * This is a React Server Component. Do NOT import into Client Components.
 * Renders a <script type="application/ld+json"> tag with the given schema.
 */

// Opt-in to React Server Components explicitly (no "use client" directive).

interface JsonLdProps {
  /** A valid Schema.org object. Must include @context and @type at minimum. */
  schema: Record<string, unknown>;
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
