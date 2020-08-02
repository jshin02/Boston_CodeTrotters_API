API="http://localhost:4741"
URL_PATH="/grad/${NAME}"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "name": "'"${NAME}"'"
    }
  }'
echo
