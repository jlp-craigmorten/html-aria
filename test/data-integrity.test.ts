import { describe, expect, test } from 'vitest';
import { roles, tags } from '../src/index.js';

// simple tests that check for simple errors and inconsistencies in the data.
// even though the data is largely automatically generated from the spec, it’s
// still possible to have errors just like anything

describe('html data', () => {
  for (const [tag, tagData] of Object.entries(tags)) {
    if (tagData.defaultRole) {
      test(tag, () => {
        expect(tagData.supportedRoles, 'defaultRole not in supportedRoles').toContain(tagData.defaultRole);
        const deduped = new Set(tagData.supportedRoles);
        expect(deduped.size, 'duplicate roles in supportedRoles').toBe(tagData.supportedRoles.length);
      });
    }
  }
});

describe('role data', () => {
  for (const [role, roleData] of Object.entries(roles)) {
    describe(role, () => {
      if (roleData.required.length) {
        test('required', () => {
          expect(
            roleData.required.every((a) => roleData.supported.includes(a)),
            'supported aria-* attributes missing some required aria-* attributes',
          ).toBe(true);
        });
      }
      test('prohibited', () => {
        expect(
          roleData.prohibited.every((a) => !roleData.supported.includes(a)),
          'prohibited aria-* attributes in supported aria-* attributes',
        ).toBe(true);
      });
      test('supported', () => {
        const deduped = new Set(roleData.supported);
        expect(deduped.size, 'duplicate attributes').toBe(roleData.supported.length);
      });
    });
  }
});
