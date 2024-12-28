import { ALL_ROLES, tags } from './lib/html.js';
import { calculateAccessibleName, virtualizeElement } from './lib/util.js';
import { getFooterRole } from './tags/footer.js';
import { getTDRole } from './tags/td.js';
import type { ARIARole, AncestorList, VirtualElement } from './types.js';

export interface SupportedRoleOptions {
  /**
   * Much like getRole(), the ancestors determines the intrinsic role. But ancestors
   * also determine _valid_ roles—certain roles MUST NOT contain certain children.
   * For example:
   *
   * - <td> with ancestors ['table'] MAY ONLY be a ['cell'] (all other roles are not supported)
   * - <td> with ancestors ['grid'] or ['treegrid'] MAY ONLY be a ['gridcell'] (all other roles are not supported)
   * - <td> with NO ancestors ([]) will allow any role
   */
  ancestors?: AncestorList;
}

/**
 * Given an HTML element, returns a list of supported ARIA roles for that element.
 * An empty array means no roles are supported (which is true for some elements!)
 */
export function getSupportedRoles(element: HTMLElement | VirtualElement, options?: SupportedRoleOptions): ARIARole[] {
  const { tagName, attributes = {} } = virtualizeElement(element);
  const tag = tags[tagName];
  if (!tag) {
    return [];
  }

  // special cases: some HTML elements require unique logic to determine supported roles based on attributes, etc.
  switch (tagName) {
    case 'a': {
      return 'href' in attributes ? ['link'] : tag.supportedRoles;
    }
    case 'area': {
      return 'href' in attributes ? ['button', 'link'] : tag.supportedRoles;
    }
    case 'footer':
    case 'header': {
      const role = getFooterRole(options);
      return role === 'generic' ? ['generic', 'group', 'none', 'presentation'] : tag.supportedRoles;
    }
    case 'div': {
      return options?.ancestors?.[0]?.tagName === 'dl' ? ['none', 'presentation'] : tag.supportedRoles;
    }
    case 'img': {
      const name = calculateAccessibleName({ tagName, attributes });
      if (name) {
        /** @see https://www.w3.org/TR/html-aria/#el-img */
        return ['button', 'checkbox', 'image', 'img', 'link', 'math', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'meter', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab', 'treeitem']; // biome-ignore format: long list
      }
      return tag.supportedRoles;
    }
    case 'input': {
      const type = ((attributes.type as string) ?? '').toLocaleLowerCase();
      switch (type) {
        case 'button': {
          return ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem']; // biome-ignore format: long list
        }
        case 'checkbox': {
          return 'aria-pressed' in attributes
            ? ['button', 'menuitemcheckbox', 'option', 'switch', 'checkbox']
            : ['menuitemcheckbox', 'option', 'switch', 'checkbox'];
        }
        case 'color':
        case 'date':
        case 'datetime-local':
        case 'file':
        case 'hidden':
        case 'month': {
          return [];
        }
        case 'image': {
          return ['button', 'checkbox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem']; // biome-ignore format: long list
        }
      }

      if ('list' in attributes) {
        return ['combobox'];
      }

      return tag.supportedRoles;
    }
    case 'td': {
      const role = getTDRole(options);
      switch (role) {
        case 'cell': {
          return ['cell'];
        }
        case 'gridcell': {
          return ['gridcell'];
        }
        default: {
          return ALL_ROLES;
        }
      }
    }
    case 'th': {
      // Deviation from the spec: only treat as “no corresponding role” if user has explicated this
      if (options?.ancestors && options.ancestors.length === 0) {
        return ALL_ROLES;
      }
      return ['cell', 'columnheader', 'rowheader'];
    }
  }

  // Known cases that aren’t possible to detect without scanning full DOM:
  // - <div> directly <dl> MUST be either role="presentation" or role="none"

  return tag.supportedRoles;
}

/** Helper function for getSupportedRoles that returns a boolean instead */
export function isSupportedRole(
  role: string,
  element: HTMLElement | VirtualElement,
  options?: SupportedRoleOptions,
): boolean {
  return getSupportedRoles(element, options).includes(role as ARIARole);
}
