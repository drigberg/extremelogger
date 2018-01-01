# EXTREME LOGGER

THE EXTREME LOGGER IS HERE FOR ALL YOUR EXTREME LOGGING NEEDS

- ANNOUNCE THINGS IN STYLE
- USE IT TO UNNECESSARILY SLOW DOWN YOUR SCRIPTS
- SNEAK IT INTO YOUR PROFESSIONAL PROJECTS TO SEE IF YOUR BOSS IS PAYING ATTENTION
- SHOW IT TO YOUR FRIENDS AND THEN CRY BECAUSE 99% OF WHAT WE DO WILL NEVER IMPRESS NON-PROGRAMMERS

THE POSSIBILITIES ARE ENDLESS, BUT THE PROBABILITIES START AT 0 AND END AT 1, BY DEFINITION

_NOW GET LOGGING!_

```js
const xlog = require('extremelogger')

const run = async () => {
  // THE SPINNINGBAR CLASS IS GOOD FOR LOADING MESSAGES
  const spinningBar = new xlog.SpinningBar()
  spinningBar.start("SPINNING THINGS...", 5000, "DONE SPINNING")
  await pause(1500)
  await spinningBar.stop()

  // THE ROLLINGBAR CLASS IS MUCH THE SAME BUT MORE LIKE A SHURIKEN / KUNAI / THROWN AXE
  const rollingBar = new xlog.RollingBar()
  rollingBar.start("TOSSING THINGS...", 5000, "DONE TOSSING")
  await pause(1500)
  await rollingBar.stop()

  // xlog.tickertape(text <string>, reverse <boolean>, timeInMs <number>, completionText <string>)
  await xlog.tickertape("THIS TEXT SHALL NOT PASS!", false, 1500)
  await xlog.tickertape("THIS TOO SHALL PASS!!!!", true, 1500, "This text has indeed passed.")

  // xlog.build(text <string>, timeInMs <number>)
  await xlog.build("THIS IS THE DAWNING OF THE AGE OF AQUARIUS", 1500)

  // xlog.buildByWord(text <string>, delimiter <string> (defaults to " "))
  await xlog.buildByWord("I am become Death, destroyer of worlds")
  await xlog.buildByWord("I_am_become_split_by_underscores,_separator_of_words", "_")

  // xlog.expand(text <string>, timeInMs <number>)
  await xlog.expand("Th-th-th-th-that's all, folks!", 1500)

  // xlog.closeIn(text <string>, timeInMs <number>)
  await xlog.closeIn("||||||(I AM A CURTAIN)||||||", 1500)
}
```