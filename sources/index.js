let req = require.context(`./`, true, /^(?!.*\.test\.js$).*\.js$/);

for (let name of req.keys()) {

    let filtered = name.replace(/^.\/|\.js$/g, ``);

    if (filtered === `index`)
        continue;

    let module = req(name);
    let parts = filtered.split(`/`);

    let target = exports;

    for (let t = 0; t < parts.length - 1; ++t)
        target = target[parts[t]] = target[parts[t]] || {};

    let main = module[parts[parts.length - 1]] || {};
    target[parts[parts.length - 1]] = main;

    for (let symbol of Reflect.ownKeys(module)) {
        if (symbol !== parts[parts.length - 1]) {
            main[symbol] = module[symbol];
        }
    }

}
