/**
 * Pause for a set time (best used with async)
 * @param {Number} time - wait time in milliseconds
 */
function pause(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
}

/**
 * Return number at index of pyramid series (1, 3, 6, 10, 15, etc)
 * @param {Number} num - index in series
 */
function pyramidal(num) {
  function add(sum, index) {
    if (index == num) {
      return sum + index
    }

    return add(sum + index, index + 1)
  }

  return add(0, 1)
}

module.exports = {
  pause,
  pyramidal
}