API="http://localhost:4741"
URL_PATH="/gradId"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "person": {
      "id": "'"${ID}"'",
      "gradId": "'"${GRADID}"'"
    }
  }'

echo
