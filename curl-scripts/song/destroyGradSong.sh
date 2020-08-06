#!/bin/bash

API="http://localhost:4741"

curl "${API}/grads/${ID}/songs/${SONGID}" \
  --include \
  --request DELETE \

echo
