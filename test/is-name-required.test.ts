import { describe, expect, test } from 'vitest';
import { isNameRequired, roles } from '../src/index.js';
import { checkTestAndTagName } from './helpers.js';

describe('isNameRequired', () => {
  const tests: [string, { given: Parameters<typeof isNameRequired>[0]; want: ReturnType<typeof isNameRequired> }][] = [
    ['alert', { given: 'alert', want: false }],
    ['alertdialog', { given: 'alertdialog', want: true }],
    ['application', { given: 'application', want: true }],
    ['article', { given: 'article', want: false }],
    ['banner', { given: 'banner', want: false }],
    ['blockquote', { given: 'blockquote', want: false }],
    ['button', { given: 'button', want: true }],
    ['caption', { given: 'caption', want: false }],
    ['cell', { given: 'cell', want: false }],
    ['checkbox', { given: 'checkbox', want: true }],
    ['code', { given: 'code', want: false }],
    ['columnheader', { given: 'columnheader', want: true }],
    ['combobox', { given: 'combobox', want: true }],
    ['comment', { given: 'comment', want: false }],
    ['complementary', { given: 'complementary', want: false }],
    ['contentinfo', { given: 'contentinfo', want: false }],
    ['definition', { given: 'definition', want: false }],
    ['deletion', { given: 'deletion', want: false }],
    ['dialog', { given: 'dialog', want: true }],
    ['directory', { given: 'directory', want: false }],
    ['document', { given: 'document', want: false }],
    ['emphasis', { given: 'emphasis', want: false }],
    ['feed', { given: 'feed', want: false }],
    ['figure', { given: 'figure', want: false }],
    ['form', { given: 'form', want: true }],
    ['generic', { given: 'generic', want: false }],
    ['graphics-document', { given: 'graphics-document', want: true }],
    ['graphics-object', { given: 'graphics-object', want: false }],
    ['graphics-symbol', { given: 'graphics-symbol', want: true }],
    ['grid', { given: 'grid', want: true }],
    ['gridcell', { given: 'gridcell', want: false }],
    ['group', { given: 'group', want: false }],
    ['heading', { given: 'heading', want: true }],
    ['image', { given: 'image', want: true }],
    ['img', { given: 'img', want: true }],
    ['insertion', { given: 'insertion', want: false }],
    ['link', { given: 'link', want: true }],
    ['list', { given: 'list', want: false }],
    ['listbox', { given: 'listbox', want: true }],
    ['listitem', { given: 'listitem', want: false }],
    ['log', { given: 'log', want: false }],
    ['main', { given: 'main', want: false }],
    ['mark', { given: 'mark', want: false }],
    ['marquee', { given: 'marquee', want: false }],
    ['math', { given: 'math', want: false }],
    ['menu', { given: 'menu', want: false }],
    ['menubar', { given: 'menubar', want: false }],
    ['menuitem', { given: 'menuitem', want: true }],
    ['menuitemcheckbox', { given: 'menuitemcheckbox', want: true }],
    ['menuitemradio', { given: 'menuitemradio', want: true }],
    ['meter', { given: 'meter', want: true }],
    ['navigation', { given: 'navigation', want: false }],
    ['none', { given: 'none', want: false }],
    ['note', { given: 'note', want: false }],
    ['option', { given: 'option', want: true }],
    ['paragraph', { given: 'paragraph', want: false }],
    ['presentation', { given: 'presentation', want: false }],
    ['progressbar', { given: 'progressbar', want: true }],
    ['radio', { given: 'radio', want: true }],
    ['radiogroup', { given: 'radiogroup', want: true }],
    ['region', { given: 'region', want: true }],
    ['row', { given: 'row', want: false }],
    ['rowgroup', { given: 'rowgroup', want: false }],
    ['rowheader', { given: 'rowheader', want: true }],
    ['scrollbar', { given: 'scrollbar', want: false }],
    ['search', { given: 'search', want: false }],
    ['searchbox', { given: 'searchbox', want: true }],
    ['separator', { given: 'separator', want: false }],
    ['slider', { given: 'slider', want: true }],
    ['spinbutton', { given: 'spinbutton', want: true }],
    ['status', { given: 'status', want: false }],
    ['strong', { given: 'strong', want: false }],
    ['subscript', { given: 'subscript', want: false }],
    ['suggestion', { given: 'suggestion', want: false }],
    ['superscript', { given: 'superscript', want: false }],
    ['switch', { given: 'switch', want: true }],
    ['tab', { given: 'tab', want: true }],
    ['table', { given: 'table', want: true }],
    ['tablist', { given: 'tablist', want: false }],
    ['tabpanel', { given: 'tabpanel', want: true }],
    ['term', { given: 'term', want: false }],
    ['textbox', { given: 'textbox', want: true }],
    ['time', { given: 'time', want: false }],
    ['timer', { given: 'timer', want: false }],
    ['toolbar', { given: 'toolbar', want: false }],
    ['tooltip', { given: 'tooltip', want: false }],
    ['tree', { given: 'tree', want: true }],
    ['treegrid', { given: 'treegrid', want: true }],
    ['treeitem', { given: 'treeitem', want: true }],
  ];

  const allRoles = new Set<string>();

  test.each(tests)('%s', (name, { given, want }) => {
    checkTestAndTagName(name, given);
    allRoles.add(given);
    expect(isNameRequired(given)).toEqual(want);
  });

  test('all roles tested', () => {
    expect([...allRoles].filter((role) => !(role in roles))).toEqual([]);
  });
});