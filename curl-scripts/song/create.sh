#!/bin/bash

API="http://localhost:4741"
URL_PATH="/songs"

curl "${API}${URL_PATH}/${GRADID}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "song": {
      "title": "'"${TITLE}"'",
      "artist": "'"${ARTIST}"'",
      "owner": "'"${USERID}"'"
    }
  }'

echo
