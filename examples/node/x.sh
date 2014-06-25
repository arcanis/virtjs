while read line && [[ ${line} != *$1* ]]; do
    :
done

while read line; do
    echo "${line}"
done
