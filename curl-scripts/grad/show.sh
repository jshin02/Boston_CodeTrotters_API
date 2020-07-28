API="http://localhost:4741"
URL_PATH="/grads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \

echo
