import type { ARIAAttribute, ARIARole, TagName } from '../types.js';
import { ALL_ROLES, NO_ROLES } from './aria-roles.js';

export const NO_CORRESPONDING_ROLE = undefined;

export interface TagInfo {
  /**
   * Note: this is very likely to be overridden by custom logic! This won’t even
   * apply for half of elements since they are influenced by attribute and
   * Accessibility Tree ancestors.
   */
  defaultRole: ARIARole | undefined;
  /**
   * ⚠️ This is the default set of allowed roles. Many elements have special conditioning
   * that narrow the allowed roles, that’s not easily serializable. That logic can be found
   * in getSupportedRoles().
   */
  supportedRoles: ARIARole[];
  /**
   * If this conflicts with the role’s allowed attributes, this takes precedence.
   */
  supportedAttributesOverride?: ARIAAttribute[];
  /**
   * If this element doesn’t allow aria-label and related attributes by
   * default (Note: if a `role` is specified, this is ignored!)
   */
  namingProhibited?: boolean;
}

export const tags: Record<TagName, TagInfo> = {
  // Main root
  html: {
    defaultRole: 'document',
    supportedRoles: ['document'],
    supportedAttributesOverride: [],
  },

  // Document metadata
  base: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: NO_ROLES,
    supportedAttributesOverride: [],
  },
  head: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  link: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  meta: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  style: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  title: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },

  // Sectioning root
  body: {
    defaultRole: 'generic',
    supportedRoles: ['generic'],
    // <body> supports all global + generic aria-* attributes EXCEPT aria-hidden
    supportedAttributesOverride: ['aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-description', 'aria-details', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant'], // biome-ignore format: long list
    namingProhibited: true,
  },

  // Content sectioning
  address: {
    defaultRole: 'group',
    supportedRoles: ALL_ROLES,
  },
  article: {
    defaultRole: 'article',
    supportedRoles: ['article', 'application', 'document', 'feed', 'main', 'none', 'presentation', 'region'], // biome-ignore format: long list
  },
  aside: {
    defaultRole: 'complementary',
    supportedRoles: ['complementary', 'feed', 'none', 'note', 'presentation', 'region', 'search'],
  },
  footer: {
    defaultRole: 'contentinfo',
    supportedRoles: ['contentinfo', 'generic', 'group', 'none', 'presentation'],
  },
  header: {
    defaultRole: 'banner',
    supportedRoles: ['banner', 'generic', 'group', 'none', 'presentation'],
  },
  h1: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  h2: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  h3: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  h4: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  h5: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  h6: {
    defaultRole: 'heading',
    supportedRoles: ['heading', 'none', 'presentation', 'tab'],
  },
  hgroup: {
    defaultRole: 'group',
    supportedRoles: ALL_ROLES,
  },
  main: {
    defaultRole: 'main',
    supportedRoles: ['main'],
  },
  nav: {
    defaultRole: 'navigation',
    supportedRoles: ['menu', 'menubar', 'navigation', 'none', 'presentation', 'tablist'],
  },
  section: {
    defaultRole: 'region', // note: for <section>, we can’t determine the accessible name without scanning the entire document. Assume it’s "region".
    supportedRoles: ['alert', 'alertdialog', 'application', 'banner', 'complementary', 'contentinfo', 'dialog', 'document', 'feed', 'generic', 'group', 'log', 'main', 'marquee', 'navigation', 'none', 'note', 'presentation', 'region', 'search', 'status', 'tabpanel'], // biome-ignore format: long list
  },
  search: {
    defaultRole: 'search',
    supportedRoles: ['form', 'group', 'none', 'presentation', 'region', 'search'],
  },

  // Text content
  blockquote: {
    defaultRole: 'blockquote',
    supportedRoles: ALL_ROLES,
  },
  dd: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: NO_ROLES,
  },
  div: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  dl: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['group', 'list', 'none', 'presentation'],
  },
  dt: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['listitem'],
  },
  figcaption: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['group', 'none', 'presentation'],
    namingProhibited: true,
  },
  figure: {
    defaultRole: 'figure',
    supportedRoles: ALL_ROLES, // Note: there are some minor behavioral quirks here which we gloss over
  },
  hr: {
    defaultRole: 'separator',
    supportedRoles: ['none', 'presentation', 'separator'],
  },
  li: {
    defaultRole: 'listitem',
    supportedRoles: ['listitem'],
  },
  menu: {
    defaultRole: 'list',
    supportedRoles: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
  },
  ol: {
    defaultRole: 'list',
    supportedRoles: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
  },
  p: {
    defaultRole: 'paragraph',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  pre: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  ul: {
    defaultRole: 'list',
    supportedRoles: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
  },

  // Inline text semantics
  a: {
    defaultRole: 'link',
    supportedRoles: ['button', 'checkbox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
  },
  abbr: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  b: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  bdi: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  bdo: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  br: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['none', 'presentation'],
    supportedAttributesOverride: ['aria-hidden'],
  },
  cite: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  code: {
    defaultRole: 'code',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  data: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  dfn: {
    defaultRole: 'term',
    supportedRoles: ALL_ROLES,
  },
  em: {
    defaultRole: 'emphasis',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  i: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  kbd: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  mark: {
    defaultRole: 'mark',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  q: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  rp: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  rt: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  ruby: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
  },
  s: {
    defaultRole: 'deletion',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  samp: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  small: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  span: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  strong: {
    defaultRole: 'strong',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  sub: {
    defaultRole: 'subscript',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  sup: {
    defaultRole: 'superscript',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  time: {
    defaultRole: 'time',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  u: {
    defaultRole: 'generic',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  var: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  wbr: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['none', 'presentation'],
    supportedAttributesOverride: ['aria-hidden'],
  },

  // Image and multimedia
  area: {
    defaultRole: 'link',
    supportedRoles: ['link'],
  },
  audio: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['application'],
  },
  img: {
    defaultRole: 'none',
    supportedRoles: ['img', 'image', 'none', 'presentation'],
  },
  map: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  track: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  video: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['application'],
  },

  // Embedded content
  embed: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['application', 'document', 'img', 'image', 'none', 'presentation'],
  },
  iframe: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['application', 'document', 'img', 'image', 'none', 'presentation'], // biome-ignore format: long list
  },
  object: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['application', 'document', 'img', 'image'],
  },
  picture: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: ['aria-hidden'],
  },
  source: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },

  // SVG and MathML
  svg: {
    defaultRole: 'graphics-document',
    supportedRoles: ALL_ROLES,
  },
  math: {
    defaultRole: 'math',
    supportedRoles: ['math'],
  },

  // Scripting
  canvas: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
  },
  noscript: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  script: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },

  del: {
    defaultRole: 'deletion',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },
  ins: {
    defaultRole: 'insertion',
    supportedRoles: ALL_ROLES,
    namingProhibited: true,
  },

  // Table content
  caption: {
    defaultRole: 'caption',
    supportedRoles: ['caption'],
    namingProhibited: true,
  },
  col: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: NO_ROLES,
    supportedAttributesOverride: [],
  },
  colgroup: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: NO_ROLES,
    supportedAttributesOverride: [],
  },
  table: {
    defaultRole: 'table',
    supportedRoles: ALL_ROLES,
  },
  tbody: {
    defaultRole: 'rowgroup',
    supportedRoles: ALL_ROLES,
  },
  td: {
    defaultRole: 'cell',
    supportedRoles: ['cell'],
  },
  tfoot: {
    defaultRole: 'rowgroup',
    supportedRoles: ALL_ROLES,
  },
  th: {
    defaultRole: 'columnheader',
    supportedRoles: ['cell', 'columnheader', 'gridcell', 'rowheader'],
  },
  thead: {
    defaultRole: 'rowgroup',
    supportedRoles: ALL_ROLES,
  },
  tr: {
    defaultRole: 'row',
    supportedRoles: ['row'],
  },

  // Forms
  button: {
    defaultRole: 'button',
    supportedRoles: ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
  },
  datalist: {
    defaultRole: 'listbox',
    supportedRoles: ['listbox'],
    supportedAttributesOverride: [],
  },
  fieldset: {
    defaultRole: 'group',
    supportedRoles: ['group', 'none', 'presentation', 'radiogroup'],
  },
  form: {
    defaultRole: 'form',
    supportedRoles: ['form', 'none', 'presentation', 'search'],
  },
  input: {
    defaultRole: 'textbox',
    supportedRoles: ['combobox', 'searchbox', 'spinbutton', 'textbox'],
  },
  label: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    namingProhibited: true,
  },
  legend: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    namingProhibited: true,
  },
  meter: {
    defaultRole: 'meter',
    supportedRoles: ['meter'],
  },
  optgroup: {
    defaultRole: 'group',
    supportedRoles: ['group'],
  },
  option: {
    defaultRole: 'option',
    supportedRoles: ['option'],
  },
  output: {
    defaultRole: 'status',
    supportedRoles: ALL_ROLES,
  },
  progress: {
    defaultRole: 'progressbar',
    supportedRoles: ['progressbar'],
  },
  select: {
    defaultRole: 'combobox',
    supportedRoles: ['combobox', 'menu'],
  },
  textarea: {
    defaultRole: 'textbox',
    supportedRoles: ['textbox'],
  },

  // Interactive elements
  details: {
    defaultRole: 'group',
    supportedRoles: ['group'],
  },
  dialog: {
    defaultRole: 'dialog',
    supportedRoles: ['alertdialog', 'dialog'],
  },
  summary: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ALL_ROLES,
  },

  // Web Components
  slot: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },
  template: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: [],
    supportedAttributesOverride: [],
  },

  // SVG tags (partial)
  g: {
    defaultRole: NO_CORRESPONDING_ROLE,
    supportedRoles: ['group', 'graphics-object'],
  },
};
