
// This file will be prepended by JSON data by the script generate_data.sh,
// and so can freely access a variable data.
console.log("Loaded script");
// // Some helpful constructs borrowed from Tom Shuster's CacheIR analyzer
// const $ = document.querySelector.bind(document);

class DefaultMap extends Map {
    constructor(defaultConstructor, init) {
      super(init);
      this.defaultConstructor = defaultConstructor;
    }

    get(key) {
      if (!this.has(key)) {
        this.set(key, this.defaultConstructor(key));
      }
      return super.get(key);
    }
};


// Parse through and chunk the paths into sensible bits
// Use them to also fill in some statistic counters.
function create_path_splits_and_compute_stats(matches) {
    // Some statistics maps.
    let baseDirectoryStats = new DefaultMap(() => 0);
    let filenameStats = new DefaultMap(() => 0);

    matches.results.forEach(element => {
        let halves = element.path.split('js/src/');
        element.shortPath = halves[1];
        let pathremainder = element.shortPath.split('/');
        element.baseDir = pathremainder[0];
        element.filename = pathremainder[pathremainder.length -1];

        baseDirectoryStats.set(element.baseDir, baseDirectoryStats.get(element.baseDir) + 1);
        filenameStats.set(element.filename, filenameStats.get(element.filename) + 1);
    });

    return {directory: baseDirectoryStats, filename: filenameStats};
}

function append_two_column_table(target, column1_title, column2_title, map) {
    let table = document.createElement("table");
    table.innerHTML = `<tr> <th> ${column1_title}  </th> <th> ${column2_title} </th></tr>`;
    map.forEach((key, value, _) => {
        table.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    target.appendChild(table);
}

function update_summary(matches, stats) {
    var count = matches.results.length;
    let res = document.getElementById("summary");
    let p = document.createElement("p");
    let text = document.createTextNode("Found "+count+" results");
    p.appendChild(text);
    res.appendChild(p);

    append_two_column_table(res, "Base Directory", "Count", stats.directory);
    append_two_column_table(res, "Filename", "Count", stats.filename);
}

function append_revision_info(revision) {
    let res = document.getElementById("summary");
    let p = document.createElement("p");
    let date = new Date(revision.date * 1000);
    let text = document.createTextNode(`Most recently analyzed revision ${revision.node} from ${date}`);
    p.appendChild(text);
    res.appendChild(p);
}

function update_most_recent_summary() {
    // Summrize results for the latest data
    let most_recent = data[data.length - 1];
    append_revision_info(most_recent);
    let stats = create_path_splits_and_compute_stats(most_recent);
    update_summary(most_recent, stats);
}

function create_data() {
    let plot_data = {x: [], y: []};
    data.forEach((value, index, array) => {
        let count = value.results.length;
        let date = new Date(value.date * 1000);
        plot_data.y.push(count);
        plot_data.x.push(index /*value.date*/);
    });
    return plot_data;
}



update_most_recent_summary();

function create_plot() {
    let data = create_data();
    console.log(data);
    let tester = document.getElementById('tester');
    Plotly.plot(tester, [data], {margin: {t: 0}});
}
create_plot();


console.log("ran scripts");