# AnimationFrameClock
A simple JS class to simplify `requestAnimationFrame` handling.

### Remote script link :

`<script src="https://auer404.github.io/animationframeclock/AnimationFrameClock.js"></script>`

---

### Using `setInterval`-like syntax :

`const AFC = new AnimationFrameClock( callback_function , interval_in_milliseconds );`

### Using an options object as argument :

`const AFC = new AnimationFrameClock( { on_interval: callback_function , interval: interval_in_milliseconds } );`

### `setTimeout` behavior :

`const AFC = new AnimationFrameClock({`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`on_interval: callback_function,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`interval: interval_in_milliseconds,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cycle_limit:1`  
  `});`

---

#### Available options :

- `on_interval` (callback function) - will trigger at every interval
- `interval` (milliseconds, default 1)
- `cycle_limit` (int, default 0) - if greater than 0, determines an amount of cycles (intervals) before the clock automatically stops
- `frame_rate` (fps) - will be used to calculate `interval` (if not given)
- `auto_start` (boolean, default true) - determines whether the clock should run at instantiation or wait for a `start()` method call
- `on_start` (callback function) - will trigger at every `start()` method call
- `on_stop` (callback function) - will trigger at every `stop()` method call
- `on_request` (callback function) - will trigger at every internal Animation Frame request

#### Available methods :

- `start()`
- `stop()`
- `toggle()`
