const {
  build,
  buildByWord,
  closeIn,
  expand,
  tickertape,
  RollingBar,
  SpinningBar
} = require('./index')

const { pause } = require('./helpers')

const run = async () => {
  const rollingBar = new RollingBar()
  rollingBar.start("TOSSING THINGS...", 5000, "DONE TOSSING")
  await pause(1500)
  await rollingBar.stop()

  const spinningBar = new SpinningBar()
  spinningBar.start("SPINNING THINGS...", 5000, "DONE SPINNING")
  await pause(1500)
  await spinningBar.stop()

  await tickertape("THIS TEXT SHALL NOT PASS!", false, 1500)
  await tickertape("THIS TOO SHALL PASS!!!!", true, 1500, "This text has indeed passed.")
  await build("THIS IS THE DAWNING OF THE AGE OF AQUARIUS", 1500)
  await buildByWord("I am become Death, destroyer of worlds")
  await buildByWord("I_am_become_split_by_underscores,_separator_of_words", "_")
  await expand("Th-th-th-th-that's all, folks!", 1500)
  await closeIn("||||||(I AM A CURTAIN)||||||", 1500)
}

run()
