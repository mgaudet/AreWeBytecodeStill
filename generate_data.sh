echo "\"use strict\";"
echo "let matches = {"
echo "list:"
#rg --json  jsbytecode ~/mozilla-unified-clean-2/js/src/ | jq 'select(.type == "match") | {path: .data.path.text, line: .data.line_number} ' | jq --slurp .
# Development
cat j.json;
echo "};"

cat process.js
