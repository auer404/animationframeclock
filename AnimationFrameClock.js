class AnimationFrameClock {

    default_options = {
        auto_start: true,
        frame_rate: false,
        interval: 1,
        cycle_limit: 0,
        on_interval: function () { },
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

        if (this.interval < 1) {
            this.interval = 1;
        }

        this.cycle_limit = options.cycle_limit;

        this.on_start = options.on_start;
        this.on_stop = options.on_stop;

        this.on_request = options.on_request;

        this.on_interval = options.on_interval;

        if (options[0] && typeof options[0] == "function") {
            this.on_interval = options[0];
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
        this.cycles = 0;
        this.prev_ts = undefined;
    }

    toggle() {
        if (this.active) {
            this.stop();
        } else {
            this.start();
        }
    }

    cycle_limit_reached() {
        return this.cycle_limit > 0 && this.cycles >= this.cycle_limit;
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

        while (this.elapsed_total >= this.interval && !this.cycle_limit_reached()) {
            this.elapsed_total -= this.interval;
            this.on_interval();
            this.cycles++;
        }

        if (!this.cycle_limit_reached()) {
            this.request = window.requestAnimationFrame(this.evolve);
        } else {
            this.stop();
        }

    }
}