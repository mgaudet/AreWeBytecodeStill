repo=$1

hg -R $repo log -v -r . > /dev/null 2> /dev/null
x=$?
if [ $x -eq 0 ]
then
    echo "preflight check passed" 1>&2;
else
    echo "Preflight check failed, check arguments \$?=${x}" 1>&2;
fi

rev_date=`hg -R $repo log -v -r .  -T json | jq '.[] | .date | .[0]'`
rev_node=`hg -R $repo log -v -r .  -T json | jq --raw-output '.[] | .node'`

echo "Found revision ${rev_node} at date ${rev_date}" 1>&2

filename="data/${rev_date}_${rev_node}";

if [[ -e $filename ]]
then
    echo "Data already exists" 1>&2
else
    echo "{" >> $filename
    echo "  \"node\": \"${rev_node}\"," >> $filename
    echo "  \"date\": \"${rev_date}\"," >> $filename
    echo -n "  \"results\": " >> $filename
    rg --json jsbytecode $repo/js/src/  | jq 'select(.type == "match") | {path: .data.path.text, line: .data.line_number} ' | jq --slurp . >> $filename
    echo "}," >> $filename
fi



echo "\"use strict\";"
echo "let data = ["
cat data/*
echo "];"

cat process.js
