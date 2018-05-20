# colored-log

Composable colored logger in browser console

## Highlights

- use colored console.log without `%c`
- use colored console.log more natural
- composable styles
- nest styles
- inherit styles from top level

## Install

```sh
$ yarn add colored-log
```

## Usage

```js
const colored = require('colored-log')

const blue = colored.createStyle('color: #0984e3;')
const yellow = colored.createStyle('color: #fdcb6e;')
const red = colored.createStyle('color: #d63031;')
const green = colored.createStyle('color: #00b894;')

colored.log`normal ${blue('blue')} ${yellow('yellow')} ${red('red')} ${green('green')}`
```

![Single Style](https://raw.githubusercontent.com/AnNOtis/colored-log/master/misc/single-style.png)

### Global default style

```js
colored.style = 'font-weight: bold; color: red;' // set default style
colored.log`All text are bold and red`

colored.style = '' // set empty string to reset default style
```

![Default Style](https://raw.githubusercontent.com/AnNOtis/colored-log/master/misc/default-style.png)

### Nest Style

when nesting styles, inner style will automatically inherit style from top level

```js
const yellowBg = colored.createStyle('background: #fdcb6e;')
const red = colored.createStyle('color: #d63031;')

// the word 'style' will be renderd with red color and also yellow background(inherit from top level)
colored.log`${yellowBg` nested ${red`style`} is avaliable!! `}`
```

![Nest Styles](https://raw.githubusercontent.com/AnNOtis/colored-log/master/misc/nest-styles.png)

### Compose styles

```js
const yellowBg = colored.createStyle('background: #fdcb6e;')
const redText = colored.createStyle('color: #d63031;')
const boldText = colored.createStyle('font-weight: bold;')

const highlight = yellowBg(redText(boldText)) // compose styles to generate new style

colored.log`Install ${highlight` colored-log `} now!!`
```

![Compose Styles](https://raw.githubusercontent.com/AnNOtis/colored-log/master/misc/compose-styles.png)

### Compute styles and join them

```js
const rainbow = ['#d63031', '#e17055', '#fdcb6e', '#00b894', '#81ecec', '#0984e3', '#6c5ce7']
const words = 'Rainbow'

const styles = rainbow.map((color, index) => {
  const style = colored.createStyle(`background: ${color};`)
  return style(words[index])
})
colored.log`${colored.join(styles)}`
```

![Compute Messages](https://raw.githubusercontent.com/AnNOtis/colored-log/master/misc/compute-messages.png)

## Todo

- auto-detect colored console log support and fallback

## License

MIT
