# A Dashboard for Tracking Bytecode Conversion

[See it live](https://mgaudet.github.io/AreWeBytecodeStill/)

Contributions welcome! This is not good code.

## Prereqs:

* A Mercurial checkout of mozilla-central. This is currently hardcoded to
  `~/mozilla-unified-clean-2/` in the Makefile
* Make
* [jq](https://stedolan.github.io/jq/)
* [ripgrep](https://stedolan.github.io/jq/)
* A Unixy shell running something close to bash.

## Usage:

1. Update your mozilla-central checkout to a revision you want to add.
2. In this directory, run make.
3. Commit new data file (in `data` directory), as well as updated index.js and

## Develpment:

* Edit `process.js`, as `index.js` is clobbered on each build.
