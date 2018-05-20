const test = require('ava')
const colored = require('../index')
const { warning, error, createStyle, defaultStyle } = colored

test('normal style', t => {
  const output = colored`It is a colored text`
  t.deepEqual(output, ['%cIt is a colored text', defaultStyle])
})

test('colored(\'string\')', t => {
  t.deepEqual(colored('text'), ['%ctext', defaultStyle])
})

test('colored`string`', t => {
  t.deepEqual(colored`text`, ['%ctext', defaultStyle])
})

test('set default style', t => {
  colored.style = 'font-weight: bold;'
  t.deepEqual(colored`text`, ['%ctext', colored.style])

  // teardown
  colored.style = defaultStyle
})

test('custom style', t => {
  const style = 'color: yellow;'
  const custom = createStyle(style)

  t.is(custom.style, style)
  t.deepEqual(
    colored`It is a ${custom('custom style')}!!`,
    [
      '%cIt is a %ccustom style%c!!',
      defaultStyle,
      `${defaultStyle} ${style}`,
      defaultStyle
    ]
  )
})

test('nested style', t => {
  const blueBg = createStyle('background: blue;')
  const yellow = createStyle('color: yellow;')

  const output = colored`${blueBg`${yellow`yellow text`} with blue background.`}`
  t.deepEqual(
    output,
    [
      '%c%c%cyellow text%c with blue background.%c',
      defaultStyle,
      `${defaultStyle} ${blueBg.style}`,
      `${defaultStyle} ${blueBg.style} ${yellow.style}`,
      `${defaultStyle} ${blueBg.style}`,
      defaultStyle
    ]
  )
})

test('nested style - case 2', t => {
  const output = colored`Hi, ${warning`warning`} and ${error`error`}, and ${warning`warning ${error`error`}`}`
  t.deepEqual(
    output,
    [
      '%cHi, %cwarning%c and %cerror%c, and %cwarning %cerror%c%c',
      defaultStyle,
      `${defaultStyle} ${warning.style}`,
      defaultStyle,
      `${defaultStyle} ${error.style}`,
      defaultStyle,
      `${defaultStyle} ${warning.style}`,
      `${defaultStyle} ${warning.style} ${error.style}`,
      `${defaultStyle} ${warning.style}`,
      defaultStyle
    ]
  )
})
