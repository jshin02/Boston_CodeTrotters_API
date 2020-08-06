#!/bin/bash

API="http://localhost:4741"

curl "${API}/grads/${ID}/songs/${SONGID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "song": {
      "title": "'"${TITLE}"'",
      "artist": "'"${ARTIST}"'"
    }
  }'

echo
