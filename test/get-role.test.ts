import { describe, expect, test } from 'vitest';
import { type VirtualElement, getRole, tags } from '../src/index.js';
import { checkTestAndTagName } from './helpers.js';

describe('getRole', () => {
  /**
   * Document conformance requirements for use of aria-* attributes in HTML
   *
   * The following table provides normative per-element document conformance
   * requirements for the use of ARIA markup in HTML documents. Additionally, it
   * identifies the [implicit ARIA semantics](https://www.w3.org/TR/wai-aria-1.2/#implicit_semantics) that
   * apply to [HTML elements](https://html.spec.whatwg.org/multipage/infrastructure.html#html-elements).
   * The [implicit ARIA semantics](https://www.w3.org/TR/wai-aria-1.2/#implicit_semantics) of these
   * elements are defined in [HTML AAM](https://www.w3.org/TR/html-aria/#bib-html-aam-1.0).
   * @see https://www.w3.org/TR/html-aria/#docconformance
   */
  const testCases: [
    string,
    {
      given: Parameters<typeof getRole>;
      want: ReturnType<typeof getRole>;
    },
  ][] = [
    ['a', { given: [{ tagName: 'a' }], want: 'link' }],
    ['a (href)', { given: [{ tagName: 'a', attributes: { href: '/about' } }], want: 'link' }],
    ['a (no href)', { given: [{ tagName: 'a', attributes: {} }], want: 'generic' }],
    ['abbr', { given: [{ tagName: 'abbr' }], want: undefined }],
    ['address', { given: [{ tagName: 'address' }], want: 'group' }],
    ['area', { given: [{ tagName: 'area' }], want: 'link' }],
    ['area (href)', { given: [{ tagName: 'area', attributes: { href: '/about' } }], want: 'link' }],
    ['area (no href)', { given: [{ tagName: 'area', attributes: {} }], want: 'generic' }],
    ['article', { given: [{ tagName: 'article' }], want: 'article' }],
    ['aside', { given: [{ tagName: 'aside' }], want: 'complementary' }],
    [
      'aside (name, sectioning article)',
      {
        given: [
          { tagName: 'aside', attributes: { 'aria-label': 'My aside' } },
          { ancestors: [{ tagName: 'article' }] },
        ],
        want: 'complementary',
      },
    ],
    [
      'aside (name, sectioning aside)',
      {
        given: [{ tagName: 'aside', attributes: { 'aria-label': 'My aside' } }, { ancestors: [{ tagName: 'aside' }] }],
        want: 'complementary',
      },
    ],
    [
      'aside (name, sectioning nav)',
      {
        given: [{ tagName: 'aside', attributes: { 'aria-label': 'My aside' } }, { ancestors: [{ tagName: 'nav' }] }],
        want: 'complementary',
      },
    ],
    [
      'aside (name, sectioning section)',
      {
        given: [
          { tagName: 'aside', attributes: { 'aria-label': 'My aside' } },
          { ancestors: [{ tagName: 'section' }] },
        ],
        want: 'complementary',
      },
    ],
    [
      'aside (no name, sectioning article)',
      { given: [{ tagName: 'aside' }, { ancestors: [{ tagName: 'article' }] }], want: 'generic' },
    ],
    [
      'aside (no name, sectioning aside)',
      { given: [{ tagName: 'aside' }, { ancestors: [{ tagName: 'aside' }] }], want: 'generic' },
    ],
    [
      'aside (no name, sectioning nav)',
      { given: [{ tagName: 'aside' }, { ancestors: [{ tagName: 'nav' }] }], want: 'generic' },
    ],
    [
      'aside (no name, sectioning section)',
      { given: [{ tagName: 'aside' }, { ancestors: [{ tagName: 'section' }] }], want: 'generic' },
    ],
    ['audio', { given: [{ tagName: 'audio' }], want: undefined }],
    ['b', { given: [{ tagName: 'b' }], want: 'generic' }],
    ['base', { given: [{ tagName: 'base' }], want: undefined }],
    ['bdi', { given: [{ tagName: 'bdi' }], want: 'generic' }],
    ['bdo', { given: [{ tagName: 'bdo' }], want: 'generic' }],
    ['blockquote', { given: [{ tagName: 'blockquote' }], want: 'blockquote' }],
    ['body', { given: [{ tagName: 'body' }], want: 'generic' }],
    ['br', { given: [{ tagName: 'br' }], want: undefined }],
    ['button', { given: [{ tagName: 'button' }], want: 'button' }],
    ['canvas', { given: [{ tagName: 'canvas' }], want: undefined }],
    ['caption', { given: [{ tagName: 'caption' }], want: 'caption' }],
    ['cite', { given: [{ tagName: 'cite' }], want: undefined }],
    ['code', { given: [{ tagName: 'code' }], want: 'code' }],
    ['col', { given: [{ tagName: 'col' }], want: undefined }],
    ['colgroup', { given: [{ tagName: 'colgroup' }], want: undefined }],
    ['data', { given: [{ tagName: 'data' }], want: 'generic' }],
    ['datalist', { given: [{ tagName: 'datalist' }], want: 'listbox' }],
    ['dd', { given: [{ tagName: 'dd' }], want: undefined }],
    ['del', { given: [{ tagName: 'del' }], want: 'deletion' }],
    ['details', { given: [{ tagName: 'details' }], want: 'group' }],
    ['dfn', { given: [{ tagName: 'dfn' }], want: 'term' }],
    ['dialog', { given: [{ tagName: 'dialog' }], want: 'dialog' }],
    ['div', { given: [{ tagName: 'div' }], want: 'generic' }],
    ['dl', { given: [{ tagName: 'dl' }], want: undefined }],
    ['dt', { given: [{ tagName: 'dt' }], want: undefined }],
    ['em', { given: [{ tagName: 'em' }], want: 'emphasis' }],
    ['embed', { given: [{ tagName: 'embed' }], want: undefined }],
    ['fieldset', { given: [{ tagName: 'fieldset' }], want: 'group' }],
    ['figcaption', { given: [{ tagName: 'figcaption' }], want: undefined }],
    ['figure', { given: [{ tagName: 'figure' }], want: 'figure' }],
    ['footer', { given: [{ tagName: 'footer' }], want: 'contentinfo' }],
    ['footer (landmark)', { given: [{ tagName: 'footer' }, { ancestors: [{ tagName: 'article' }] }], want: 'generic' }],
    ['form', { given: [{ tagName: 'form' }], want: 'form' }],
    ['g', { given: [{ tagName: 'g' }], want: undefined }],
    ['h1', { given: [{ tagName: 'h1' }], want: 'heading' }],
    ['h2', { given: [{ tagName: 'h2' }], want: 'heading' }],
    ['h3', { given: [{ tagName: 'h3' }], want: 'heading' }],
    ['h4', { given: [{ tagName: 'h4' }], want: 'heading' }],
    ['h5', { given: [{ tagName: 'h5' }], want: 'heading' }],
    ['h6', { given: [{ tagName: 'h6' }], want: 'heading' }],
    ['head', { given: [{ tagName: 'head' }], want: undefined }],
    ['header', { given: [{ tagName: 'header' }], want: 'banner' }],
    ['header (landmark)', { given: [{ tagName: 'header' }, { ancestors: [{ tagName: 'main' }] }], want: 'generic' }],
    ['hgroup', { given: [{ tagName: 'hgroup' }], want: 'group' }],
    ['hr', { given: [{ tagName: 'hr' }], want: 'separator' }],
    ['html', { given: [{ tagName: 'html' }], want: 'document' }],
    ['i', { given: [{ tagName: 'i' }], want: 'generic' }],
    ['iframe', { given: [{ tagName: 'iframe' }], want: undefined }],
    ['img (named by alt)', { given: [{ tagName: 'img', attributes: { alt: 'My image' } }], want: 'img' }],
    ['img (named by label)', { given: [{ tagName: 'img', attributes: { 'aria-label': 'My image' } }], want: 'img' }],
    [
      'img (named by labelledby)',
      { given: [{ tagName: 'img', attributes: { 'aria-labelledby': 'My image' } }], want: 'img' },
    ],
    ['img (no name)', { given: [{ tagName: 'img' }], want: 'none' }],
    ['input', { given: [{ tagName: 'input' }], want: 'textbox' }],
    ['input[type=button]', { given: [{ tagName: 'input', attributes: { type: 'button' } }], want: 'button' }],
    ['input[type=color]', { given: [{ tagName: 'input', attributes: { type: 'color' } }], want: undefined }],
    ['input[type=date]', { given: [{ tagName: 'input', attributes: { type: 'date' } }], want: undefined }],
    [
      'input[type=datetime-local]',
      { given: [{ tagName: 'input', attributes: { type: 'datetime-local' } }], want: undefined },
    ],
    ['input[type=email]', { given: [{ tagName: 'input', attributes: { type: 'email' } }], want: 'textbox' }],
    ['input[type=file]', { given: [{ tagName: 'input', attributes: { type: 'file' } }], want: undefined }],
    ['input[type=hidden]', { given: [{ tagName: 'input', attributes: { type: 'hidden' } }], want: undefined }],
    ['input[type=month]', { given: [{ tagName: 'input', attributes: { type: 'month' } }], want: undefined }],
    ['input[type=number]', { given: [{ tagName: 'input', attributes: { type: 'number' } }], want: 'spinbutton' }],
    ['input[type=password]', { given: [{ tagName: 'input', attributes: { type: 'password' } }], want: undefined }],
    ['input[type=radio]', { given: [{ tagName: 'input', attributes: { type: 'radio' } }], want: 'radio' }],
    ['input[type=range]', { given: [{ tagName: 'input', attributes: { type: 'range' } }], want: 'slider' }],
    ['input[type=reset]', { given: [{ tagName: 'input', attributes: { type: 'reset' } }], want: 'button' }],
    ['input[type=search]', { given: [{ tagName: 'input', attributes: { type: 'search' } }], want: 'searchbox' }],
    ['input[type=submit]', { given: [{ tagName: 'input', attributes: { type: 'submit' } }], want: 'button' }],
    ['input[type=tel]', { given: [{ tagName: 'input', attributes: { type: 'tel' } }], want: 'textbox' }],
    ['input[type=text]', { given: [{ tagName: 'input', attributes: { type: 'text' } }], want: 'textbox' }],
    ['input[type=shrek]', { given: [{ tagName: 'input', attributes: { type: 'shrek' } }], want: 'textbox' }],
    ['input[type=time]', { given: [{ tagName: 'input', attributes: { type: 'time' } }], want: undefined }],
    ['input[type=url]', { given: [{ tagName: 'input', attributes: { type: 'url' } }], want: 'textbox' }],
    ['input[type=week]', { given: [{ tagName: 'input', attributes: { type: 'week' } }], want: undefined }],

    // Note: for input lists, ONLY text, search, tel, url, email, and invalid
    // should produce a combobox. Other lists are ignored. But we want to test
    // all of them to guarantee this behavior is correct.
    // @see https://www.w3.org/TR/html-aria/#el-input-text-list
    ['input (list)', { given: [{ tagName: 'input', attributes: { list: 'things' } }], want: 'combobox' }],
    ['input[type=button] (list)', { given: [{ tagName: 'input', attributes: { type: 'button' } }], want: 'button' }],
    [
      'input[type=color] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'color', list: 'colors' } }], want: undefined },
    ],
    [
      'input[type=date] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'date', list: 'dates' } }], want: undefined },
    ],
    [
      'input[type=datetime-local] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'datetime-local', list: 'datetimes' } }], want: undefined },
    ],
    [
      'input[type=email] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'email', list: 'emails' } }], want: 'combobox' },
    ],
    [
      'input[type=file] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'file', list: 'files' } }], want: undefined },
    ],
    [
      'input[type=hidden] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'hidden', list: 'secrets' } }], want: undefined },
    ],
    [
      'input[type=month] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'month', list: 'months' } }], want: undefined },
    ],
    [
      'input[type=number] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'number', list: 'numbers' } }], want: 'spinbutton' },
    ],
    [
      'input[type=password] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'password', list: 'passwords' } }], want: undefined },
    ],
    [
      'input[type=radio] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'radio', list: 'radios' } }], want: 'radio' },
    ],
    [
      'input[type=range] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'range', list: 'ranges' } }], want: 'slider' },
    ],
    [
      'input[type=reset] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'reset', list: 'buttons' } }], want: 'button' },
    ],
    [
      'input[type=search] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'search', list: 'searches' } }], want: 'combobox' },
    ],
    [
      'input[type=submit] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'submit', list: 'buttons' } }], want: 'button' },
    ],
    [
      'input[type=tel] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'tel', list: 'phone numbers' } }], want: 'combobox' },
    ],
    [
      'input[type=text] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'text', list: 'texts' } }], want: 'combobox' },
    ],
    [
      'input[type=shrek] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'shrek', list: 'ogres' } }], want: 'combobox' },
    ],
    [
      'input[type=time] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'time', list: 'times' } }], want: undefined },
    ],
    [
      'input[type=url] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'url', list: 'urls' } }], want: 'combobox' },
    ],
    [
      'input[type=week] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'week', list: 'weeks' } }], want: undefined },
    ],
    ['ins', { given: [{ tagName: 'ins' }], want: 'insertion' }],
    ['label', { given: [{ tagName: 'label' }], want: undefined }],
    ['legend', { given: [{ tagName: 'legend' }], want: undefined }],
    ['li', { given: [{ tagName: 'li' }], want: 'listitem' }],
    ['li (no ancestors)', { given: [{ tagName: 'li' }, { ancestors: [] }], want: 'generic' }],
    ['link', { given: [{ tagName: 'link' }], want: undefined }],
    ['kbd', { given: [{ tagName: 'kbd' }], want: undefined }],
    ['main', { given: [{ tagName: 'main' }], want: 'main' }],
    ['map', { given: [{ tagName: 'map' }], want: undefined }],
    ['mark', { given: [{ tagName: 'mark' }], want: 'mark' }],
    ['math', { given: [{ tagName: 'math' }], want: 'math' }],
    ['menu', { given: [{ tagName: 'menu' }], want: 'list' }],
    ['meta', { given: [{ tagName: 'meta' }], want: undefined }],
    ['meter', { given: [{ tagName: 'meter' }], want: 'meter' }],
    ['nav', { given: [{ tagName: 'nav' }], want: 'navigation' }],
    ['noscript', { given: [{ tagName: 'noscript' }], want: undefined }],
    ['object', { given: [{ tagName: 'object' }], want: undefined }],
    ['ol', { given: [{ tagName: 'ol' }], want: 'list' }],
    ['optgroup', { given: [{ tagName: 'optgroup' }], want: 'group' }],
    ['option', { given: [{ tagName: 'option' }], want: 'option' }],
    ['output', { given: [{ tagName: 'output' }], want: 'status' }],
    ['p', { given: [{ tagName: 'p' }], want: 'paragraph' }],
    ['picture', { given: [{ tagName: 'picture' }], want: undefined }],
    ['pre', { given: [{ tagName: 'pre' }], want: 'generic' }],
    ['progress', { given: [{ tagName: 'progress' }], want: 'progressbar' }],
    ['q', { given: [{ tagName: 'q' }], want: 'generic' }],
    ['rp', { given: [{ tagName: 'rp' }], want: undefined }],
    ['rt', { given: [{ tagName: 'rt' }], want: undefined }],
    ['ruby', { given: [{ tagName: 'ruby' }], want: undefined }],
    ['s', { given: [{ tagName: 's' }], want: 'deletion' }],
    ['samp', { given: [{ tagName: 'samp' }], want: 'generic' }],
    ['script', { given: [{ tagName: 'script' }], want: undefined }],
    ['search', { given: [{ tagName: 'search' }], want: 'search' }],
    [
      'section (named by label)',
      { given: [{ tagName: 'section', attributes: { 'aria-label': 'My section' } }], want: 'region' },
    ],
    [
      'section (named by labelledby)',
      { given: [{ tagName: 'section', attributes: { 'aria-labelledby': 'My section' } }], want: 'region' },
    ],
    ['section (no name)', { given: [{ tagName: 'section' }], want: 'generic' }],
    ['select', { given: [{ tagName: 'select' }], want: 'combobox' }],
    ['select[size=0]', { given: [{ tagName: 'select', attributes: { size: 0 } }], want: 'combobox' }],
    ['select[size=1]', { given: [{ tagName: 'select', attributes: { size: 1 } }], want: 'combobox' }],
    ['select[size=2]', { given: [{ tagName: 'select', attributes: { size: 2 } }], want: 'listbox' }],
    ['select[multiple]', { given: [{ tagName: 'select', attributes: { multiple: true } }], want: 'listbox' }],
    ['select[role=generic]', { given: [{ tagName: 'select', attributes: { role: 'generic' } }], want: 'generic' }],
    ['span', { given: [{ tagName: 'span' }], want: 'generic' }],
    ['small', { given: [{ tagName: 'small' }], want: 'generic' }],
    ['source', { given: [{ tagName: 'source' }], want: undefined }],
    ['slot', { given: [{ tagName: 'slot' }], want: undefined }],
    ['strong', { given: [{ tagName: 'strong' }], want: 'strong' }],
    ['style', { given: [{ tagName: 'style' }], want: undefined }],
    ['sub', { given: [{ tagName: 'sub' }], want: 'subscript' }],
    ['summary', { given: [{ tagName: 'summary' }], want: undefined }],
    ['sup', { given: [{ tagName: 'sup' }], want: 'superscript' }],
    ['svg', { given: [{ tagName: 'svg' }], want: 'graphics-document' }],
    ['svg[role=img]', { given: [{ tagName: 'svg', attributes: { role: 'img' } }], want: 'img' }],
    [
      'svg[role=graphics-symbol img]',
      { given: [{ tagName: 'svg', attributes: { role: 'graphics-symbol img' } }], want: 'graphics-symbol' },
    ],
    ['table', { given: [{ tagName: 'table' }], want: 'table' }],
    ['tbody', { given: [{ tagName: 'tbody' }], want: 'rowgroup' }],
    ['td', { given: [{ tagName: 'td' }], want: 'cell' }],
    ['td (no ancestors)', { given: [{ tagName: 'td' }, { ancestors: [] }], want: undefined }],
    ['td (table)', { given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table' }] }], want: 'cell' }],
    [
      'td (grid)',
      {
        given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table', attributes: { role: 'grid' } }] }],
        want: 'gridcell',
      },
    ],
    [
      'td (treegrid)',
      {
        given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table', attributes: { role: 'treegrid' } }] }],
        want: 'gridcell',
      },
    ],
    ['template', { given: [{ tagName: 'template' }], want: undefined }],
    ['textarea', { given: [{ tagName: 'textarea' }], want: 'textbox' }],
    ['thead', { given: [{ tagName: 'thead' }], want: 'rowgroup' }],
    ['tfoot', { given: [{ tagName: 'tfoot' }], want: 'rowgroup' }],
    ['th', { given: [{ tagName: 'th' }], want: 'columnheader' }],
    ['th (no ancestors)', { given: [{ tagName: 'th' }, { ancestors: [] }], want: undefined }],
    ['th[scope=col]', { given: [{ tagName: 'th', attributes: { scope: 'col' } }], want: 'columnheader' }],
    ['th[scope=colgroup]', { given: [{ tagName: 'th', attributes: { scope: 'colgroup' } }], want: 'columnheader' }],
    ['th[scope=row]', { given: [{ tagName: 'th', attributes: { scope: 'row' } }], want: 'rowheader' }],
    ['th[scope=rowgroup]', { given: [{ tagName: 'th', attributes: { scope: 'rowgroup' } }], want: 'rowheader' }],
    ['th (table)', { given: [{ tagName: 'th' }, { ancestors: [{ tagName: 'table' }] }], want: 'cell' }],
    [
      'th (grid)',
      {
        given: [{ tagName: 'th' }, { ancestors: [{ tagName: 'table', attributes: { role: 'grid' } }] }],
        want: 'gridcell',
      },
    ],
    [
      'th (treegrid)',
      {
        given: [{ tagName: 'th' }, { ancestors: [{ tagName: 'table', attributes: { role: 'treegrid' } }] }],
        want: 'gridcell',
      },
    ],
    ['time', { given: [{ tagName: 'time' }], want: 'time' }],
    ['title', { given: [{ tagName: 'title' }], want: undefined }],
    ['tr', { given: [{ tagName: 'tr' }], want: 'row' }],
    ['track', { given: [{ tagName: 'track' }], want: undefined }],
    ['u', { given: [{ tagName: 'u' }], want: 'generic' }],
    ['ul', { given: [{ tagName: 'ul' }], want: 'list' }],
    ['var', { given: [{ tagName: 'var' }], want: undefined }],
    ['video', { given: [{ tagName: 'video' }], want: undefined }],
    ['wbr', { given: [{ tagName: 'wbr' }], want: undefined }],
  ];

  describe('from object', () => {
    const testedTags = new Set<string>();

    test.each(testCases)('%s', (name, { given, want }) => {
      testedTags.add(given[0].tagName);
      checkTestAndTagName(name, given[0].tagName);
      expect(getRole(...given)).toBe(want);
    });

    test('all tags are tested', () => {
      const allTags = Object.keys(tags);
      for (const tag of allTags) {
        if (!testedTags.has(tag)) {
          console.warn(`Tag "${tag}" is not tested`);
        }
      }
    });
  });

  describe('from DOM element', () => {
    function elFromVirtual(el: VirtualElement) {
      const element = document.createElement(el.tagName);
      if (el.attributes) {
        for (const [name, value] of Object.entries(el.attributes)) {
          element.setAttribute(name, String(value));
        }
      }
      return element;
    }

    // Note: because of the way the DOM tests work, we can’t specify
    // an empty attributes array, so 2 tests written in object
    // syntax operate differently. Only skip those 2.
    const domTestCases = testCases.filter(([name]) => !['a', 'area'].includes(name));

    test.each(domTestCases)('%s', (_, { given, want }) => {
      // convert main element to DOM element
      const mainEl = elFromVirtual(given[0] as VirtualElement);
      const options = { ...given[1] };
      // also, to test ancestors, convert those, too
      if (options.ancestors) {
        options.ancestors = options.ancestors.map((el) => elFromVirtual(el as VirtualElement));
      }
      expect(getRole(mainEl, options)).toBe(want);
    });
  });
});
