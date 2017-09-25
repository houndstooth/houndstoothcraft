DEV_SERVER_PORT=$1
KARMA_SERVER_PORT=$2

declare -a arr=(
    ~/workspace/web-render/coverage/lcov-report/index.html
    http://localhost:$KARMA_SERVER_PORT/debug.html
    http://localhost:$DEV_SERVER_PORT
    https://app.asana.com/0/358570257763740/314008242914015
)

if [[ $OSTYPE == darwin* ]] ; then
    for i in ${arr[@]} ; do
       open $i
    done
else
    for i in ${arr[@]} ; do
       start $i
    done
fi
