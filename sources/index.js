let req = require.context(`./`, true, /\.js$/);

for (let name of req.keys()) {

    let filtered = name.replace(/^.\/|\.js$/g, ``);

    if (filtered === `index`)
        continue;

    let module = req(name);
    let parts = filtered.split(`/`);

    let target = exports;

    for (let t = 0; t < parts.length - 1; ++t)
        target = target[parts[t]] = target[parts[t]] || {};

    target[parts[parts.length - 1]] = module[parts[parts.length - 1]];

}
