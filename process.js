
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

// A map that keeps track of
let baseDirectoryStats = new DefaultMap(() => 0);
let filenameDirectoryStats = new DefaultMap(() => 0);

function create_path_splits() {
    matches.list.forEach(element => {
        let halves = element.path.split('js/src/');
        element.shortPath = halves[1];
        let pathremainder = element.shortPath.split('/');
        element.baseDir = pathremainder[0];
        element.filename = pathremainder[pathremainder.length -1];

        baseDirectoryStats.set(element.baseDir, baseDirectoryStats.get(element.baseDir) + 1);
        filenameDirectoryStats.set(element.filename, filenameDirectoryStats.get(element.filename) + 1);
    });
}

function update_results() {
    var count = matches.list.length;
    let res = $("#results");
    let p = document.createElement("p");
    let text = document.createTextNode("Found "+count+" results");
    p.appendChild(text);
    res.appendChild(p);
}

update_results();
create_path_splits();

console.log("Script ran");
console.log("Found ")