#!/usr/bin/env sh

set -e

# I feel like this should be able to be two lines, but I just spend 2 hours trying to get a variable into sed any simpler to no avail.

touch listener.txt
> listener.txt
printf "<script>new EventSource('http:\/\/localhost:" >> listener.txt
printf $ISTANBUL_WATCHER_PORT >> listener.txt
printf "\/codeUpdates').addEventListener('message', () => window.location.reload())<\/script><\/body>" >> listener.txt
LISTENER=$(cat listener.txt)

touch remove_any_existing_listeners.txt
printf 's/'"${LISTENER}"'/<\/body>/g' > remove_any_existing_listeners.txt
REMOVE_ANY_EXISTING_LISTENERS=$(cat remove_any_existing_listeners.txt)

touch add_new_listener.txt
printf 's/<\/body>/'"${LISTENER}"'/g' > add_new_listener.txt
ADD_NEW_LISTENER=$(cat add_new_listener.txt)

sed -i -e "$REMOVE_ANY_EXISTING_LISTENERS" test/unit/coverage/lcov-report/index.html
sed -i -e "$ADD_NEW_LISTENER" test/unit/coverage/lcov-report/index.html

rm listener.txt
rm remove_any_existing_listeners.txt
rm add_new_listener.txt
