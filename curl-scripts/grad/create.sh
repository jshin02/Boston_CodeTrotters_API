API="http://localhost:4741"
URL_PATH="/grads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "person": {
      "name": "'"${NAME}"'",
      "role": "'"${ROLE}"'",
      "compliment": "'"${COMP}"'",
      "interests": "'"${INTERESTS}"'",
      "imageUrl": "'"${IMG}"'",
      "linkedin": "'"${IN}"'",
      "email": "'"${EMAIL}"'",
      "instagram": "'"${INSTA}"'"
    }
  }'

echo
