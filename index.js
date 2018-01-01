/**
 * Module dependencies
 */

const rl = require('readline')
const { pause, pyramidal } = require('./helpers')

/**
 * Module
 */

const defaultInterval = 75
const maxLength = 100

/**
 * Displays stock-market-type scrolling text
 * @param {String} text - text to display
 * @param {Boolean} reverse - reverses if true
 * @param {Number} time - time before completion
 * @param {String} completionText - (optional) text to display when complete
 */
async function tickertape(text, reverse, time, completionText) {
  const n = Math.floor(maxLength / (text.length + 1))
  let index = 0
  let iterated = ""

  // repeat text up to max length
  for (let i = 0; i < n; i++) {
    iterated += `${text} `
  }

  let toDisplay

  // only display until time is up
  while (Math.abs(index) * defaultInterval < time) {
    // tickertape effect is based on start position in repeated text
    const position = index % maxLength || 0
    toDisplay = `${iterated.slice(position)}${iterated.slice(0, position)}`

    process.stdout.write(toDisplay)

    await pause(defaultInterval)

    rl.moveCursor(process.stdout, maxLength * -1)
    rl.clearLine(process.stdout)

    index += reverse ? -1 : 1
  }

  // print final iteration or given final text
  process.stdout.write(completionText || toDisplay)
  process.stdout.write("\n")

}

/**
 * Sends letters flying to end of line to build in place
 * @param {String} text - text to display
 * @param {Number} time - time until completion
 */
async function build(text, time) {
  // with access to factorial, use: (n + 1)! / (2^n - 2^(n - 1))
  const steps = pyramidal(text.length)
  const interval = time / steps
  let locked = ""

  // create blank string for later use
  let blank = ""
  for (let i = 0; i < text.length; i++) {
    blank += " "
  }

  for (let i = 0; i < text.length; i++) {
    // display one letter at a time from end
    let current = text[text.length - 1 - i]

    for (let j = 0; j < text.length - locked.length; j++) {
      // place letter at beginning and move to end, with locked characters in place
      output = `${blank.slice(0, j)}${current}${blank.slice(j + 1, text.length - locked.length)}${locked}`

      rl.moveCursor(process.stdout, text.length * -1)
      rl.clearLine(process.stdout)
      process.stdout.write(output)

      await pause(interval)
    }

    locked = `${current}${locked}`
  }

  process.stdout.write('\n')
}

/**
 * Sends words flying to end of line to build in place
 * Note: cannot be timed (yet)
 * @param {String} text - text to display
 * @param {String} delimiter - character for splitting (default: " ")
 */
async function buildByWord(text, delimiter) {
  delimiter = delimiter || " "
  const array = text.split(delimiter)
  const interval = 10
  let locked = ""

  // create blank string for later use
  let blank = ""
  for (let i = 0; i < text.length; i++) {
    blank += " "
  }

  for (let i = 0; i < array.length; i++) {
    let current = array[array.length - 1 - i]
    if (i < array.length - 1) {
      current = `${delimiter}${current}`
    }

    for (let j = 0; j <= text.length - current.length - locked.length; j++) {
      output = `${blank.slice(0, j)}${current}${blank.slice(j + current.length, text.length - locked.length)}${locked}`

      rl.moveCursor(process.stdout, text.length * -1)
      rl.clearLine(process.stdout)
      process.stdout.write(output)

      await pause(interval)
    }

    locked = `${current}${locked}`
  }

  process.stdout.write('\n')
}

/**
 * Starts blank and expands display of text from center
 * @param {String} text - text to display
 * @param {Number} time - time until completion
 */
async function expand(text, time) {
  // with access to factorial, use: (n + 1)! / (2^n - 2^(n - 1))

  // number of steps === middle index
  const middleOrSteps = text.length / 2
  const interval = time / middleOrSteps
  let locked = ""

  // create blank string for later use
  let blank = ""
  for (var i = 0; i < middleOrSteps; i++) {
    blank += " "
  }

  for (let i = 0; i <= middleOrSteps; i++) {
    // display center of text with padding at beginning (no need to pad end)
    const padding = blank.slice(0, middleOrSteps - i)
    const show = text.slice(middleOrSteps - i, middleOrSteps + i)

    const output = `${padding}${show}`

    rl.moveCursor(process.stdout, text.length * -1)
    rl.clearLine(process.stdout)
    process.stdout.write(output)

    await pause(interval)
  }

  process.stdout.write('\n')
}

/**
 * Starts blank and contracts display of text from ends
 * @param {String} text - text to display
 * @param {Number} time - time until completion
 */
async function closeIn(text, time) {
  // with access to factorial, use: (n + 1)! / (2^n - 2^(n - 1))
  const steps = text.length / 2
  const interval = time / steps
  let locked = ""

  // create blank string for later use
  let blank = ""
  for (var i = 0; i < text.length; i++) {
    blank += " "
  }

  for (let i = 0; i <= steps; i++) {
    // display first and last and keep adding characters to both ends
    // padding gets smaller each time
    const first = text.slice(0, i)
    const padding = blank.slice(i, text.length - i)
    const last = text.slice(text.length - i)

    const output = `${first}${padding}${last}`

    rl.moveCursor(process.stdout, text.length * -1)
    rl.clearLine(process.stdout)
    process.stdout.write(output)

    await pause(interval)
  }

  process.stdout.write('\n')
}

class SpinningBar {
  async stop() {
    this.spinning = false
    return await pause(this.interval)
  }

  /**
   * Display text with a spinning bar
   * @param {String} text - text to display
   * @param {Number} maxTime - time until completion
   * @param {String} completionText - (optional) text to display when complete
   */
  async start(text, maxTime, completionText) {
    this.spinning = true
    this.started = Date.now()
    this.interval = 100

    const bars = ['/', '-', '|', '\\']
    const lineLength = text.length + 2
    let index = 0

    while (this.spinning && Date.now() - this.started < maxTime) {
      index += 1
      // cycle through array of bars
      let barIndex = index % bars.length
      const bar = bars[barIndex]
      const output = `${text} ${bar}`

      process.stdout.write(output)

      await pause(this.interval)

      rl.moveCursor(process.stdout, lineLength * -1)
      rl.clearLine(process.stdout)
    }

    process.stdout.write(completionText)
    process.stdout.write('\n')
  }
}

class RollingBar {
  async stop() {
    this.rolling = false
    return await pause(this.interval)
  }

  /**
   * Display text with a rolling bar
   * @param {String} text - text to display
   * @param {Number} maxTime - time until completion
   * @param {String} completionText - (optional) text to display when complete
   */
  async start(text, maxTime, completionText) {
    this.rolling = true
    this.started = Date.now()
    this.interval = 50

    const bars = ['/', '-', '|', '\\']
    const max = 10
    let index = 0
    let direction = 1
    let output

    // create blank string for later use
    let blank = ""
    for (let i = 0; i < max; i++) {
      blank += " "
    }

    // stop if this.stop() is called, or max time reached
    while (this.rolling && Date.now() - this.started < maxTime) {
      // reverse if reaching end of line
      if (index === max) {
        direction = -1
      }

      // reverse if at beginning
      if (index === 0) {
        direction = 1
      }

      index += 1 * direction

      let barIndex = index % bars.length
      const bar = bars[barIndex]
      output = `${text} ${blank.slice(0, index)}${bar}`

      process.stdout.write(output)

      await pause(this.interval)

      rl.moveCursor(process.stdout, output.length * -1)
      rl.clearLine(process.stdout)
    }

    process.stdout.write(completionText)
    process.stdout.write('\n')
  }
}

/**
 * Module exports
 */

module.exports = {
  build,
  buildByWord,
  closeIn,
  expand,
  tickertape,
  RollingBar,
  SpinningBar
}