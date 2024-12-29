import { roles } from './lib/aria-roles.js';
import { NO_CORRESPONDING_ROLE, tags } from './lib/html.js';
import { calculateAccessibleName, isEmptyAncestorList, parseTokenList, virtualizeElement } from './lib/util.js';
import { getFooterRole } from './tags/footer.js';
import { getHeaderRole } from './tags/header.js';
import { getInputRole } from './tags/input.js';
import { getSelectRole } from './tags/select.js';
import { getTDRole } from './tags/td.js';
import { getTHRole } from './tags/th.js';
import type { ARIARole, AncestorList, VirtualElement } from './types.js';

export interface GetRoleOptions {
  /**
   * Declare relevant ancestors, ordered from most direct parent to furthest
   * ancestor. This affects the results, e.g.
   *
   * - <td> with ancestors ['table'] will be role 'cell'
   * - <td> with ancestors ['grid'] or ['treegrid'] will be 'gridcell'
   * - <td> with NO ancestors ([]) will be no role (`undefined`)
   *
   * This list does NOT have to be complete; e.g. `'row'`  can be skipped as it
   * doesn’t affect behavior. But irrelevant parents may be supplied for ease of
   * use, and only the first significant ancestor will apply.
   */
  ancestors?: AncestorList;
}

/**
 * Get the corresponding ARIA role for a given HTML element.
 * `undefined` means “no corresponding role”.
 * Note this does NOT traverse the DOM, because we assume it’s not fully available, e.g. in Node.js, React Components, lint rules, etc.
 * @see https://www.w3.org/TR/html-aria/
 */
export function getRole(element: HTMLElement | VirtualElement, options?: GetRoleOptions): ARIARole | undefined {
  const { tagName, attributes } = virtualizeElement(element);

  // explicit role: use if valid
  if (typeof attributes?.role === 'string') {
    // Note: according to the spec, `role` can not only be a list of spring-separated values;
    // it can contain fallbacks the browser may not understand. According to spec, an arbitrary
    // role is to be ignored, so we take the first match (if any), or `undefined`.
    const roleList = parseTokenList(attributes.role);
    const firstValidRole = roleList.find((role) => role in roles) as ARIARole | undefined;
    // Note: even though the spec forbids certain elements from having certain
    // roles, most browsers will ignore this and simply take `role` at face
    // value. We’ll follow that behavior, taking the author at their word.
    if (firstValidRole) {
      return firstValidRole;
    }
  }

  const tag = tags[tagName];
  if (!tag) {
    return undefined;
  }

  switch (tagName) {
    case 'a':
    case 'area': {
      return attributes && !('href' in attributes) ? 'generic' : tag.defaultRole;
    }
    case 'header': {
      return getHeaderRole(options);
    }
    case 'img': {
      const name = calculateAccessibleName({ tagName, attributes });
      return name ? 'img' : 'none';
    }
    case 'input': {
      return getInputRole({ attributes });
    }
    case 'li': {
      return isEmptyAncestorList(options?.ancestors) ? 'generic' : tag.defaultRole;
    }
    case 'footer': {
      return getFooterRole(options);
    }
    case 'select': {
      return getSelectRole({ attributes });
    }
    case 'td': {
      return getTDRole(options);
    }
    case 'th': {
      return getTHRole({ attributes, ancestors: options?.ancestors });
    }
    case 'tr': {
      return isEmptyAncestorList(options?.ancestors) ? NO_CORRESPONDING_ROLE : tag.defaultRole;
    }
  }

  return tag.defaultRole;
}
