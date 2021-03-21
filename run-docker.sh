# command line argument: ./run-docker password database port
if [ "$1" != "" ]; 
then
    pass=$1
else
    pass="mysecretpassword"
    printf "\ncreated with default password $pass\n"
fi

if [ "$2" != "" ]; 
then
    db=$2
else
    db="development"
    printf "db with default name $db created\n"
fi

if [ "$3" != "" ]; 
then
    port=$3
else
    port="5432"
    printf "using default port $port\n\n\n"
fi

{
    echo docker run -e POSTGRES_PASSWORD=$pass -e POSTGRES_DB=$db -p $port:$port -d postgres
    docker run -e POSTGRES_PASSWORD=$pass -e POSTGRES_DB=$db -p $port:$port -d postgres
} || {
    printf "\n\n\033[31mcreating the docker container failed\033[0m"
    printf "\nVerify that there is not a process running on the designated port."
    printf "\nTo find and kill a process running on a port, run 'sudo kill \$(sudo lsof -t -i:<insert port number here>)'\n\n"

    printf "\033[31mIf the process running is a docker container, the above command will return an error. To see running docker containers, run 'docker container ls'. If there is a docker container running on the port, then run 'docker kill <insert container id>' \n\n\n"
}
