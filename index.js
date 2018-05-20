const defaultStyle = ''
const createStyle = currentStyle => {
  const styledFunction = (arg, ...interps) => {
    if (typeof arg === 'string') {
      return [`%c${arg}`, styledFunction.style]
    }

    if (typeof arg === 'function') {
      return createStyle(`${currentStyle} ${arg.style}`)
    }

    return arg.reduce((acc, message, index) => {
      const [joinedMessage, ...styles] = acc
      let interpMessage = ''
      let interpStyles = []

      if (typeof interps[index] === 'string') {
        interpMessage = interps[index]
      } else if (Array.isArray(interps[index])) {
        interpMessage = interps[index][0]
        interpStyles = interps[index].slice(1).map(style => `${styledFunction.style} ${style}`)
      }

      return [
        `${joinedMessage || ''}%c${message}${interpMessage}`,
        ...styles,
        styledFunction.style,
        ...interpStyles
      ]
    }, [])
  }
  styledFunction.style = currentStyle
  return styledFunction
}

const raw = createStyle(defaultStyle)

const join = (styledMessages) =>
  styledMessages.reduce((acc, message) => {
    if (typeof message === 'string') {
      return [
        `${acc[0]}%c${message}`,
        ...acc.slice(1),
        raw.style
      ]
    } else if (Array.isArray(message)) {
      return [
        acc[0] + message[0],
        ...acc.slice(1),
        ...message.slice(1)
      ]
    } else {
      return acc
    }
  }, [''])

Object.assign(raw, {
  createStyle,
  warning: createStyle('color: #fdcb6e;'),
  error: createStyle('color: #d63031;'),
  log: (...args) => console.log(...raw(...args)),
  join
})

module.exports = raw
