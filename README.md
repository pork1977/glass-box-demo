# glass-box-demo

A deliberately small marketing site that exists so AI agents have something
real to change.

It is the sandbox for [Glass Box](https://github.com/pork1977/glass-box), which
records agents doing a piece of work and replays it. When a recorded flight
opens a pull request here, that pull request is real: you can read the diff,
see which agent wrote it, and check whether the build passed.

Nothing here is used for anything else, and nothing here is trusted. It is the
only repository the recording agents can reach, and the only one their token
works on.

## The build

`npm run build` runs `build.js`, which has no dependencies and checks the
things that would otherwise be somebody's job to remember: the page has a
heading, the call to action still exists, images have alt text, tags balance,
and every on-page link points at something that exists.
