#!/bin/bash

API="http://localhost:4741"

curl "${API}/grads/${ID}/songs" \
  --include \
  --request DELETE \

echo
