
// This file will be prepended by JSON data by the script generate_data.sh,
// and so can freely access a variable "matches".

// Some helpful constructs borrowed from Tom Shuster's CacheIR analyzer
const $ = document.querySelector.bind(document);

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

// Some statistics maps.
let baseDirectoryStats = new DefaultMap(() => 0);
let filenameStats = new DefaultMap(() => 0);

function create_path_splits() {
    matches.list.forEach(element => {
        let halves = element.path.split('js/src/');
        element.shortPath = halves[1];
        let pathremainder = element.shortPath.split('/');
        element.baseDir = pathremainder[0];
        element.filename = pathremainder[pathremainder.length -1];

        baseDirectoryStats.set(element.baseDir, baseDirectoryStats.get(element.baseDir) + 1);
        filenameStats.set(element.filename, filenameStats.get(element.filename) + 1);
    });
}

function append_two_column_table(target, column1_title, column2_title, map) {
    let table = document.createElement("table");
    table.innerHTML = `<tr> <th> ${column1_title}  </th> <th> ${column2_title} </th></tr>`;
    map.forEach((key, value, _) => {
        table.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    target.appendChild(table);
}

function update_summary() {
    var count = matches.list.length;
    let res = $("#summary");
    let p = document.createElement("p");
    let text = document.createTextNode("Found "+count+" results");
    p.appendChild(text);
    res.appendChild(p);

    append_two_column_table(res, "Base Directory", "Count", baseDirectoryStats);
    append_two_column_table(res, "Filename", "Count", filenameStats);
}

create_path_splits();
update_summary();
console.log("ran scripts");