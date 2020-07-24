API="http://localhost:4741"
URL_PATH="/grads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--data '{
    "person": {
      "compliment": "'"${TEXT}"'"
    }
  }'

echo
