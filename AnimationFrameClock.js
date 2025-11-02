class AnimationFrameClock {

    default_options = {
        auto_start: true,
        frame_rate: false,
        interval: 1000,
        on_tick: function () { },
        on_request: function () { },
        on_start: function() { },
        on_stop: function() { }
    };

    constructor() {

        let args;

        if (typeof arguments[0] == "object") {
            args = arguments[0];
        } else {
            args = arguments;
        }

        const options = { ...this.default_options, ...args }

        this.auto_start = options.auto_start;

        this.frame_rate = options.frame_rate;

        if (this.frame_rate) {
            this.interval = 1000 / this.frame_rate;
        } else {
            this.interval = options.interval;
        }

        this.on_start = options.on_start;
        this.on_stop = options.on_stop;

        this.on_request = options.on_request;

        this.on_tick = options.on_tick;

        if (options[0] && typeof options[0] == "function") {
            this.on_tick = options[0];
        }

        if (options[1] && typeof options[1] == "number") {
            this.interval = options[1];
        }

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.toggle = this.toggle.bind(this);
        this.evolve = this.evolve.bind(this);

        this.reset_status();

        if (this.auto_start) {
            this.start();
        }
    }

    start() {
        if (this.active) { return false; }
        this.active = true;
        this.request = window.requestAnimationFrame(this.evolve);
        this.on_start();
    }

    stop() {
        if (this.request) {
            window.cancelAnimationFrame(this.request);
        }
        this.on_stop();
        this.reset_status();
    }

    reset_status() {
        this.active = false;
        this.elapsed_total = 0;
        this.prev_ts = undefined;
    }

    toggle() {
        if (this.active) {
            this.stop();
        } else {
            this.start();
        }
    }

    evolve(ts) {

        if (!this.active) { return false; }

        if (this.prev_ts === undefined) {
            this.prev_ts = ts;
        }

        const last_elapsed = ts - this.prev_ts;
        this.prev_ts = ts;

        this.elapsed_total += last_elapsed;

        this.on_request();

        while (this.elapsed_total >= this.interval) {
            this.elapsed_total -= this.interval;
            this.on_tick();
        }

        this.request = window.requestAnimationFrame(this.evolve);
    }
}