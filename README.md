# Batch Epoch Converter
Live page: https://aamirtechs.github.io/batch-epoch-converter/

Convert a whole pasted log of epoch timestamps in seconds, millis, micros and nanos into human dates in your timezone, annotate log lines, and convert dates back to epoch. It runs entirely in the browser so files and text you paste stay on your device. Built for busy operators who need a correct answer and a downloadable file, not another account.

## Features
- Batch paste with per-line unit auto-detection for seconds, millis, micros and nanos
- Output in ISO, local, UTC and relative form
- Annotate mode finds timestamps inside pasted log lines and appends human dates
- Reverse mode converts dates back to epoch in your chosen unit
- Copy-ready CSV export with raw, iso, local and relative columns

## How it works
Add your input in the tool card, choose the options, and run the tool. Processing happens locally in src/logic.js and the page wiring. You can review the results on screen and download the output file.

## Privacy
Runs 100% in your browser. Your files never leave this device, nothing is uploaded,
and there is no tracking.

## Development
Core logic lives in `src/logic.js` and is shared by the page and the tests.
Run the tests with `npm test`.

## License
MIT, Copyright 2026 Amir Hussain.
