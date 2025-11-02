# AnimationFrameClock
A simple JS class to simplify `requestAnimationFrame` handling.

### Using `setInterval`-like syntax :

`const AFC = new AnimationFrameClock( callback_function , interval_in_milliseconds );`

### Using an options object as argument :

`const AFC = new AnimationFrameClock( { on_tick: callback_function , interval: interval_in_milliseconds } );`

#### Available options :

- `on_tick` (callback function) - will trigger at every interval
- `interval` (milliseconds, default 0)
- `frame_rate` (fps) - will be used to calculate `interval` (if not given)
- `auto_start` (boolean, default true) - determines whether the clock should run at instantiation or wait for a `start()` method call
- `on_start` (callback function) - will trigger at every `start()` method call
- `on_stop` (callback function) - will trigger at every `stop()` method call
- `on_request` (callback function) - will trigger at every internal Animation Frame request

#### Methods :

- `start()`
- `stop()`
- `toggle()`
