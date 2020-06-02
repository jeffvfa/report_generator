#!/bin/bash

WORK_DIR=$(pwd)

# Primeiramente se processa os argumentos passados pela linha de comando.
# lista de argumentos aceitos atualmente:
# --directory-start ou -D : especifica o diretório git a ser 'escaneado'. Este argumento eh obrigatorio
# --author-name ou -A : serao somente recuperados os commits do autor passado como paramentro. Este argumento eh obrigatorio
# --multiple-directories ou -M : boolean flag que especifica se o diretorio a ser escaneado contem multiplos diretorios git. O valor default = 0
# Example: $ ./log2json.sh -D="/home/user/Documents/Projects/nome-projeto" -A="c0000000" -T="1277756, 1277761, 1277762, 1278121, 1281780"

#####################  Codigo adaptado de: https://pretzelhands.com/posts/command-line-flags   ###################################
# Valores padrao para as variaveis
author_name=''
default_directory=''
multiple_directories=0
task_list=''
output=gitlog.js
OTHER_ARGUMENTS=()

# Loop through arguments and process them
for arg in "$@"; do
  case $arg in
  -h | --help)
    # display help, TODO Dar echo no help bonitinho
    shift # Remove --help from processing
    ;;
  -M | --multiple-directories)
    multiple_directories=1
    shift # Remove --help from processing
    ;;
  -D=* | --directory-start=*)
    default_directory="${arg#*=}"
    shift # Remove --directory-start= from processing
    ;;
  -A=* | --author-name=*)
    author_name="${arg#*=}"
    shift # Remove --author-name= from processing
    ;;
  -T=* | --task-list=*)
    task_list="${arg#*=}"
    shift
    ;;
  -o=* | --output=*)
    output="${arg#*=}"
    shift # Remove --outputt= from processing
    ;;
  *)
    OTHER_ARGUMENTS+=("$1")
    shift # Remove generic argument from processing
    ;;
  esac
done
#################### Fim do codigo de recuperacao dos parametros #############################

# Verifica se o diretorio fornecido
isPathAGitRepo() {
  local repo_path=$1
  curr_dir="$(pwd)"
  cd "$repo_path" || exit
  result=$(
    git rev-parse 2>/dev/null
    ([ $? == 0 ] && echo 1) || echo 0
  )
  cd "$curr_dir" || exit
  echo "$result"
}

# valida os parametros recebidos
isGitRepo=$(isPathAGitRepo "$default_directory")
if [[ -z "$default_directory" ]]; then # verifica se o diretorio esta setado
  echo "--directory-start is a required parameter"
  exit 1
elif [[ ! -d $default_directory ]]; then # verifica se o diretorio existe
  echo "provided diretory does not exists"
  exit 1
elif [[ $isGitRepo -eq 0 && $multiple_directories -eq 0 ]]; then # verifica se eh um git repo e se nao foi marcado para escanear os subdiretorios
  echo "Diretory is not a git reposiry and flag --multiple-directories was not set"
  exit 1
elif [[ -z "$author_name" ]]; then # nome do autor eh um parametro obrigatorio
  echo "--author-name is a required parameter"
  exit 1
fi

# funcao que gera o json para um repositorio git especifico
getLogsFromDirectory() {
  local log_directory=$1
  local author_name=$2
  local output_directory=$3
  local file_suxfix=$4 || ''

  # shellcheck disable=SC2164
  cd "$log_directory"
  log_format_string="%n{%n \"commit\": \"%H\",%n \"directory\":\"$(pwd)/\",%n \"author\": \"%an <%ae>\",%n \"date\": \"%ad\",%n \"message\": \"%f\":FILES:"

  git log --name-status --max-count=1000 --author="$author_name" --date=short \
    --pretty=format:"$log_format_string"|
    perl -ne '
          BEGIN{print "["};
          if ($i = (/:FILES:[\n\r]*$/../^$/)) {
              if ($i == 1) {
                  s/:FILES:[\n\r]*$//;
                  $message = $_;
              } elsif ($i =~ /E0$/) {
                  #$print_files->();
                  print_files();
                  @files = ();
              } elsif ($_ !~ /^$/) {
                  chomp $_;
                  push @files, $_;
              }
          } else { print; }
          END { print_files(1); }

          sub print_files {
              $last_line = shift;
              print $message;
              @files ?
                  print qq(,\n  "files": [\n@{[join qq(,\n), map {qq(    "$_")} map {json_escape($_)} @files]}\n  ]\n})
                  : print "\n}";
              $last_line ? print "]" : print @files ? "," : ",\n";
          };
          sub json_escape { $_ = shift; s/([\\"])/\\\1/g; return $_; }' >"${output_directory}/gitlog${file_suxfix}.json"
}

# funcao que gera os logs json para todos os repositorios dentro do diretorio passado
getLogsFromAllDirectories() {
  local directory_with_git_repos=$1
  local author_name=$2
  local output_directory=$3
  local counter=0
  for dir in $directory_with_git_repos*; do
    if [ -d "$dir" ] && [ "$(isPathAGitRepo "$dir")" -eq 1 ]; then
      echo "$dir"
      getLogsFromDirectory "$dir" "$author_name" "$output_directory" "$counter"
      counter=$((counter + 1))
    fi
  done
}

runReportGenerator() {
  local WORK_DIR=$1
  local root_directory=$2
  local task_list=$3
  cd "$WORK_DIR"
  npm run build;
  node ./dist/report_generator.js "$root_directory" "$task_list";
  xdg-open ./output || gio open ./output || gnome-open ./output;
}

# remove arquivos antigos que estejam no diretorio de output
mkdir -p "$WORK_DIR"/output/
rm -rf "$WORK_DIR"/output/*


if [[ $multiple_directories -eq 1 ]]; then
  getLogsFromAllDirectories "$default_directory" "$author_name" "$WORK_DIR"/output
  runReportGenerator $WORK_DIR "$default_directory" "$task_list"
else
  getLogsFromDirectory "$default_directory" "$author_name" "$WORK_DIR"/output "0"
  runReportGenerator $WORK_DIR "$default_directory" "$task_list"
fi
