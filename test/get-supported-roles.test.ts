import { describe, expect, test } from 'vitest';
import { ALL_ROLES, NO_ROLES, getSupportedRoles, isSupportedRole, tags } from '../src/index.js';
import { checkTestAndTagName } from './helpers.js';

describe('getSupportedRoles', () => {
  const tests: [
    string,
    {
      given: Parameters<typeof getSupportedRoles>;
      want: ReturnType<typeof getSupportedRoles>;
    },
  ][] = [
    [
      'a',
      {
        given: [{ tagName: 'a' }],
        want: ['button', 'checkbox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    ['a (no href)', { given: [{ tagName: 'a', attributes: {} }], want: ALL_ROLES }],
    ['address', { given: [{ tagName: 'address' }], want: ALL_ROLES }],
    ['abbr', { given: [{ tagName: 'abbr' }], want: ALL_ROLES }],
    ['area', { given: [{ tagName: 'area' }], want: ['link'] }],
    ['area (no href)', { given: [{ tagName: 'area', attributes: {} }], want: ['button', 'generic', 'link'] }],
    [
      'article',
      {
        given: [{ tagName: 'article' }],
        want: ['article', 'application', 'document', 'feed', 'main', 'none', 'presentation', 'region'], // biome-ignore format: long list
      },
    ],
    [
      'aside',
      {
        given: [{ tagName: 'aside' }],
        want: ['complementary', 'feed', 'none', 'note', 'presentation', 'region', 'search'],
      },
    ],
    ['audio', { given: [{ tagName: 'audio' }], want: ['application'] }],
    ['b', { given: [{ tagName: 'b' }], want: ALL_ROLES }],
    ['base', { given: [{ tagName: 'base' }], want: NO_ROLES }],
    ['bdi', { given: [{ tagName: 'bdi' }], want: ALL_ROLES }],
    ['bdo', { given: [{ tagName: 'bdo' }], want: ALL_ROLES }],
    ['br', { given: [{ tagName: 'br' }], want: ['none', 'presentation'] }],
    ['blockquote', { given: [{ tagName: 'blockquote' }], want: ALL_ROLES }],
    ['body', { given: [{ tagName: 'body' }], want: ['generic'] }],
    [
      'button',
      {
        given: [{ tagName: 'button' }],
        want:  ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    ['caption', { given: [{ tagName: 'caption' }], want: ['caption'] }],
    ['canvas', { given: [{ tagName: 'canvas' }], want: ALL_ROLES }],
    ['cite', { given: [{ tagName: 'cite' }], want: ALL_ROLES }],
    ['code', { given: [{ tagName: 'code' }], want: ALL_ROLES }],
    ['col', { given: [{ tagName: 'col' }], want: NO_ROLES }],
    ['colgroup', { given: [{ tagName: 'colgroup' }], want: NO_ROLES }],
    ['dd', { given: [{ tagName: 'dd' }], want: NO_ROLES }],
    ['data', { given: [{ tagName: 'data' }], want: ALL_ROLES }],
    ['datalist', { given: [{ tagName: 'datalist' }], want: ['listbox'] }],
    ['del', { given: [{ tagName: 'del' }], want: ALL_ROLES }],
    ['details', { given: [{ tagName: 'details' }], want: ['group'] }],
    ['dfn', { given: [{ tagName: 'dfn' }], want: ALL_ROLES }],
    ['dialog', { given: [{ tagName: 'dialog' }], want: ['alertdialog', 'dialog'] }],
    ['div', { given: [{ tagName: 'div' }], want: ALL_ROLES }],
    ['div (dl)', { given: [{ tagName: 'div' }, { ancestors: [{ tagName: 'dl' }] }], want: ['none', 'presentation'] }],
    ['dl', { given: [{ tagName: 'dl' }], want: ['group', 'list', 'none', 'presentation'] }],
    ['dt', { given: [{ tagName: 'dt' }], want: ['listitem'] }],
    ['em', { given: [{ tagName: 'em' }], want: ALL_ROLES }],
    [
      'embed',
      { given: [{ tagName: 'embed' }], want: ['application', 'document', 'img', 'image', 'none', 'presentation'] },
    ],
    ['form', { given: [{ tagName: 'form' }], want: ['form', 'none', 'presentation', 'search'] }],
    ['fieldset', { given: [{ tagName: 'fieldset' }], want: ['group', 'none', 'presentation', 'radiogroup'] }],
    ['figure', { given: [{ tagName: 'figure' }], want: ALL_ROLES }],
    ['figcaption', { given: [{ tagName: 'figcaption' }], want: ['group', 'none', 'presentation'] }],
    [
      'footer (landmark)',
      {
        given: [{ tagName: 'footer' }, { ancestors: [{ tagName: 'main' }] }],
        want: ['generic', 'group', 'none', 'presentation'],
      },
    ],
    [
      'footer (default)',
      { given: [{ tagName: 'footer' }], want: ['contentinfo', 'generic', 'group', 'none', 'presentation'] },
    ],
    ['g', { given: [{ tagName: 'g' }], want: ['group', 'graphics-object'] }],
    ['h1', { given: [{ tagName: 'h1' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['h2', { given: [{ tagName: 'h2' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['h3', { given: [{ tagName: 'h3' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['h4', { given: [{ tagName: 'h4' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['h5', { given: [{ tagName: 'h5' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['h6', { given: [{ tagName: 'h6' }], want: ['heading', 'none', 'presentation', 'tab'] }],
    ['head', { given: [{ tagName: 'head' }], want: NO_ROLES }],
    [
      'header (landmark)',
      {
        given: [{ tagName: 'header' }, { ancestors: [{ tagName: 'main' }] }],
        want: ['generic', 'group', 'none', 'presentation'],
      },
    ],
    [
      'header (default)',
      { given: [{ tagName: 'header' }], want: ['banner', 'generic', 'group', 'none', 'presentation'] },
    ],
    ['hgroup', { given: [{ tagName: 'hgroup' }], want: ALL_ROLES }],
    ['html', { given: [{ tagName: 'html' }], want: ['document'] }],
    ['hr', { given: [{ tagName: 'hr' }], want: ['none', 'presentation', 'separator'] }],
    ['i', { given: [{ tagName: 'i' }], want: ALL_ROLES }],
    [
      'iframe',
      { given: [{ tagName: 'iframe' }], want: ['application', 'document', 'img', 'image', 'none', 'presentation'] },
    ],
    [
      'img (name)',
      {
        given: [{ tagName: 'img', attributes: { alt: 'Alternate text' } }],
        want: ['button', 'checkbox', 'image', 'img', 'link', 'math', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'meter', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    ['img (no name)', { given: [{ tagName: 'img' }], want: ['img', 'image', 'none', 'presentation'] }],
    ['input', { given: [{ tagName: 'input' }], want: ['combobox', 'searchbox', 'spinbutton', 'textbox'] }],
    [
      'input[type=button]',
      {
        given: [{ tagName: 'input', attributes: { type: 'button' } }],
        want:['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    [
      'input[type=checkbox]',
      {
        given: [{ tagName: 'input', attributes: { type: 'checkbox' } }],
        want: ['checkbox', 'menuitemcheckbox', 'option', 'switch'],
      },
    ],
    [
      'input[type=checkbox] (pressed)',
      {
        given: [{ tagName: 'input', attributes: { type: 'checkbox', 'aria-pressed': true } }],
        want: ['button', 'checkbox', 'menuitemcheckbox', 'option', 'switch'],
      },
    ],
    ['input[type=color]', { given: [{ tagName: 'input', attributes: { type: 'color' } }], want: [] }],
    ['input[type=date]', { given: [{ tagName: 'input', attributes: { type: 'date' } }], want: [] }],
    ['input[type=datetime-local]', { given: [{ tagName: 'input', attributes: { type: 'datetime-local' } }], want: [] }],
    ['input[type=email]', { given: [{ tagName: 'input', attributes: { type: 'email' } }], want: ['textbox'] }],
    ['input[type=file]', { given: [{ tagName: 'input', attributes: { type: 'file' } }], want: [] }],
    ['input[type=hidden]', { given: [{ tagName: 'input', attributes: { type: 'hidden' } }], want: [] }],
    ['input[type=month]', { given: [{ tagName: 'input', attributes: { type: 'month' } }], want: [] }],
    ['input[type=number]', { given: [{ tagName: 'input', attributes: { type: 'number' } }], want: ['spinbutton'] }],
    ['input[type=range]', { given: [{ tagName: 'input', attributes: { type: 'range' } }], want: ['slider'] }],
    ['input[type=password]', { given: [{ tagName: 'input', attributes: { type: 'password' } }], want: [] }],
    [
      'input[type=radio]',
      { given: [{ tagName: 'input', attributes: { type: 'radio' } }], want: ['menuitemradio', 'radio'] },
    ],
    ['input[type=range]', { given: [{ tagName: 'input', attributes: { type: 'range' } }], want: ['slider'] }],
    [
      'input[type=reset]',
      {
        given: [{ tagName: 'input', attributes: { type: 'reset' } }],
        want: ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    ['input[type=search]', { given: [{ tagName: 'input', attributes: { type: 'search' } }], want: ['searchbox'] }],
    [
      'input[type=submit]',
      {
        given: [{ tagName: 'input', attributes: { type: 'submit' } }],
        want: ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    ['input[type=tel]', { given: [{ tagName: 'input', attributes: { type: 'tel' } }], want: ['textbox'] }],
    [
      'input[type=text]',
      {
        given: [{ tagName: 'input', attributes: { type: 'text' } }],
        want: ['combobox', 'searchbox', 'spinbutton', 'textbox'],
      },
    ],
    [
      'input[type=shrek]',
      {
        given: [{ tagName: 'input', attributes: { type: 'shrek' } }],
        want: ['combobox', 'searchbox', 'spinbutton', 'textbox'],
      },
    ],
    ['input[type=time]', { given: [{ tagName: 'input', attributes: { type: 'time' } }], want: [] }],
    ['input[type=url]', { given: [{ tagName: 'input', attributes: { type: 'url' } }], want: ['textbox'] }],
    ['input[type=week]', { given: [{ tagName: 'input', attributes: { type: 'week' } }], want: [] }],
    ['input (list)', { given: [{ tagName: 'input', attributes: { list: 'things' } }], want: ['combobox'] }],
    [
      'input[type=button] (list)',
      {
        given: [{ tagName: 'input', attributes: { type: 'button', list: 'buttons' } }],
        want:['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    [
      'input[type=checkbox] (list)',
      {
        given: [{ tagName: 'input', attributes: { type: 'checkbox', list: 'checkboxes' } }],
        want: ['checkbox', 'menuitemcheckbox', 'option', 'switch'],
      },
    ],
    [
      'input[type=checkbox] (list, pressed)',
      {
        given: [{ tagName: 'input', attributes: { type: 'checkbox', list: 'checkboxes', 'aria-pressed': true } }],
        want: ['button', 'checkbox', 'menuitemcheckbox', 'option', 'switch'],
      },
    ],
    [
      'input[type=color] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'color', list: 'colors' } }], want: [] },
    ],
    [
      'input[type=date] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'date', list: 'dates' } }], want: [] },
    ],
    [
      'input[type=datetime-local] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'datetime-local', list: 'datetimes' } }], want: [] },
    ],
    [
      'input[type=email] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'email', list: 'emails' } }], want: ['combobox'] },
    ],
    [
      'input[type=file] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'file', list: 'files' } }], want: [] },
    ],
    [
      'input[type=hidden] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'hidden', list: 'secrets' } }], want: [] },
    ],
    [
      'input[type=month] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'month', list: 'months' } }], want: [] },
    ],
    [
      'input[type=number] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'number', list: 'numbers' } }], want: ['spinbutton'] },
    ],
    [
      'input[type=range] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'range', list: 'sliders' } }], want: ['slider'] },
    ],
    [
      'input[type=password] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'password', list: 'passwords' } }], want: [] },
    ],
    [
      'input[type=radio]',
      {
        given: [{ tagName: 'input', attributes: { type: 'radio', list: 'radios' } }],
        want: ['menuitemradio', 'radio'],
      },
    ],
    [
      'input[type=range] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'range', list: 'sliders' } }], want: ['slider'] },
    ],
    [
      'input[type=reset]',
      {
        given: [{ tagName: 'input', attributes: { type: 'reset', list: 'buttons' } }],
        want: ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    [
      'input[type=search] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'search', list: 'searches' } }], want: ['combobox'] },
    ],
    [
      'input[type=submit]',
      {
        given: [{ tagName: 'input', attributes: { type: 'submit', list: 'buttons' } }],
        want: ['button', 'checkbox', 'combobox', 'gridcell', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'separator', 'slider', 'switch', 'tab', 'treeitem'], // biome-ignore format: long list
      },
    ],
    [
      'input[type=tel] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'tel', list: 'phone numbers' } }], want: ['combobox'] },
    ],
    [
      'input[type=text] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'text', list: 'texts' } }], want: ['combobox'] },
    ],
    [
      'input[type=shrek] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'shrek', list: 'ogres' } }], want: ['combobox'] },
    ],
    [
      'input[type=time] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'time', list: 'times' } }], want: [] },
    ],
    [
      'input[type=url] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'url', list: 'urls' } }], want: ['combobox'] },
    ],
    [
      'input[type=week] (list)',
      { given: [{ tagName: 'input', attributes: { type: 'week', list: 'weeks' } }], want: [] },
    ],
    ['ins', { given: [{ tagName: 'ins' }], want: ALL_ROLES }],
    ['label', { given: [{ tagName: 'label' }], want: [] }],
    ['legend', { given: [{ tagName: 'legend' }], want: [] }],
    ['li', { given: [{ tagName: 'li' }], want: ['listitem'] }],
    ['li (no ancestors)', { given: [{ tagName: 'li' }, { ancestors: [] }], want: ALL_ROLES }],
    ['link', { given: [{ tagName: 'link' }], want: [] }],
    ['kbd', { given: [{ tagName: 'kbd' }], want: ALL_ROLES }],
    ['main', { given: [{ tagName: 'main' }], want: ['main'] }],
    ['mark', { given: [{ tagName: 'mark' }], want: ALL_ROLES }],
    ['math', { given: [{ tagName: 'math' }], want: ['math'] }],
    ['map', { given: [{ tagName: 'map' }], want: [] }],
    [
      'menu',
      {
        given: [{ tagName: 'menu' }],
        want: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
      },
    ],
    ['meta', { given: [{ tagName: 'meta' }], want: [] }],
    ['meter', { given: [{ tagName: 'meter' }], want: ['meter'] }],
    [
      'nav',
      { given: [{ tagName: 'nav' }], want: ['menu', 'menubar', 'navigation', 'none', 'presentation', 'tablist'] },
    ],
    ['noscript', { given: [{ tagName: 'noscript' }], want: [] }],
    ['object', { given: [{ tagName: 'object' }], want: ['application', 'document', 'img', 'image'] }],
    [
      'ol',
      {
        given: [{ tagName: 'ol' }],
        want: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
      },
    ],
    ['optgroup', { given: [{ tagName: 'optgroup' }], want: ['group'] }],
    ['option', { given: [{ tagName: 'option' }], want: ['option'] }],
    ['output', { given: [{ tagName: 'output' }], want: ALL_ROLES }],
    ['p', { given: [{ tagName: 'p' }], want: ALL_ROLES }],
    ['picture', { given: [{ tagName: 'picture' }], want: [] }],
    ['pre', { given: [{ tagName: 'pre' }], want: ALL_ROLES }],
    ['progress', { given: [{ tagName: 'progress' }], want: ['progressbar'] }],
    ['q', { given: [{ tagName: 'q' }], want: ALL_ROLES }],
    ['rp', { given: [{ tagName: 'rp' }], want: ALL_ROLES }],
    ['rt', { given: [{ tagName: 'rt' }], want: ALL_ROLES }],
    ['ruby', { given: [{ tagName: 'ruby' }], want: ALL_ROLES }],
    ['s', { given: [{ tagName: 's' }], want: ALL_ROLES }],
    ['samp', { given: [{ tagName: 'samp' }], want: ALL_ROLES }],
    ['script', { given: [{ tagName: 'script' }], want: [] }],
    ['search', { given: [{ tagName: 'search' }], want: ['form', 'group', 'none', 'presentation', 'region', 'search'] }],
    [
      'section',
      {
        given: [{ tagName: 'section' }],
        want:  ['alert', 'alertdialog', 'application', 'banner', 'complementary', 'contentinfo', 'dialog', 'document', 'feed', 'generic', 'group', 'log', 'main', 'marquee', 'navigation', 'none', 'note', 'presentation', 'region', 'search', 'status', 'tabpanel'], // biome-ignore format: long list
      },
    ],
    ['select', { given: [{ tagName: 'select' }], want: ['combobox', 'menu'] }],
    ['select[multiple]', { given: [{ tagName: 'select', attributes: { multiple: true } }], want: ['listbox'] }],
    ['select[size=1]', { given: [{ tagName: 'select', attributes: { size: 1 } }], want: ['combobox', 'menu'] }],
    ['select[size=2]', { given: [{ tagName: 'select', attributes: { size: 2 } }], want: ['listbox'] }],
    // Note: roles are ignored for getSupportedRoles()! This is only testing the element itself.
    [
      'select[role=generic]',
      { given: [{ tagName: 'select', attributes: { role: 'listbox' } }], want: ['combobox', 'menu'] },
    ],
    ['slot', { given: [{ tagName: 'slot' }], want: [] }],
    ['small', { given: [{ tagName: 'small' }], want: ALL_ROLES }],
    ['source', { given: [{ tagName: 'source' }], want: [] }],
    ['span', { given: [{ tagName: 'span' }], want: ALL_ROLES }],
    ['strong', { given: [{ tagName: 'strong' }], want: ALL_ROLES }],
    ['style', { given: [{ tagName: 'style' }], want: [] }],
    ['sub', { given: [{ tagName: 'sub' }], want: ALL_ROLES }],
    ['summary', { given: [{ tagName: 'summary' }], want: ALL_ROLES }],
    ['summary (in details)', { given: [{ tagName: 'summary' }, { ancestors: [{ tagName: 'details' }] }], want: [] }],
    ['sup', { given: [{ tagName: 'sup' }], want: ALL_ROLES }],
    ['svg', { given: [{ tagName: 'svg' }], want: ALL_ROLES }],
    ['table', { given: [{ tagName: 'table' }], want: ALL_ROLES }],
    ['tbody', { given: [{ tagName: 'tbody' }], want: ALL_ROLES }],
    ['td', { given: [{ tagName: 'td' }], want: ['cell'] }],
    ['td (table)', { given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table' }] }], want: ['cell'] }],
    ['td (no ancestors)', { given: [{ tagName: 'td' }, { ancestors: [] }], want: ALL_ROLES }],
    [
      'td (grid)',
      {
        given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table', attributes: { role: 'grid' } }] }],
        want: ['gridcell'],
      },
    ],
    [
      'td (treegrid)',
      {
        given: [{ tagName: 'td' }, { ancestors: [{ tagName: 'table', attributes: { role: 'treegrid' } }] }],
        want: ['gridcell'],
      },
    ],
    ['thead', { given: [{ tagName: 'thead' }], want: ALL_ROLES }],
    ['template', { given: [{ tagName: 'template' }], want: [] }],
    ['textarea', { given: [{ tagName: 'textarea' }], want: ['textbox'] }],
    ['tfoot', { given: [{ tagName: 'tfoot' }], want: ALL_ROLES }],
    ['th', { given: [{ tagName: 'th' }], want: ['cell', 'columnheader', 'gridcell', 'rowheader'] }],
    ['th (no ancestors)', { given: [{ tagName: 'th' }, { ancestors: [] }], want: ALL_ROLES }],
    ['time', { given: [{ tagName: 'time' }], want: ALL_ROLES }],
    ['title', { given: [{ tagName: 'title' }], want: [] }],
    ['tr', { given: [{ tagName: 'tr' }], want: ['row'] }],
    ['tr (no ancestors)', { given: [{ tagName: 'tr' }, { ancestors: [] }], want: ALL_ROLES }],
    ['track', { given: [{ tagName: 'track' }, { ancestors: [] }], want: [] }],
    ['u', { given: [{ tagName: 'u' }], want: ALL_ROLES }],
    [
      'ul',
      {
        given: [{ tagName: 'ul' }],
        want: ['group', 'list', 'listbox', 'menu', 'menubar', 'none', 'presentation', 'radiogroup', 'tablist', 'toolbar', 'tree'], // biome-ignore format: long list
      },
    ],
    ['var', { given: [{ tagName: 'var' }], want: ALL_ROLES }],
    ['video', { given: [{ tagName: 'video' }], want: ['application'] }],
    ['wbr', { given: [{ tagName: 'wbr' }], want: ['none', 'presentation'] }],
  ];

  const testedTags = new Set<string>();

  test.each(tests)('%s', (name, { given, want }) => {
    testedTags.add(given[0].tagName);
    expect(getSupportedRoles(...given)).toEqual(want);
    checkTestAndTagName(name, given[0].tagName);
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

test('isSupportedRole', () => {
  expect(isSupportedRole('generic', { tagName: 'html' })).toBe(false);
});
