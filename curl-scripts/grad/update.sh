API="http://localhost:4741"
URL_PATH="/grads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "person": {
      "name": "'"${NAME}"'",
      "role": "'"${ROLE}"'",
      "compliment": "'"${COMP}"'",
      "interests": "'"${INTERESTS}"'",
      "imageUrl": "'"${IMG}"'",
      "linkedin": "'"${IN}"'",
      "github": "'"${GITHUB}"'",
      "email": "'"${EMAIL}"'",
      "instagram": "'"${INSTA}"'",
      "messageTitle": "'"${TITLE}"'",
      "messageContent": "'"${CONTENT}"'",
      "endorsements": "'"${ENDORSEMENTS}"'"
    }
  }'

echo
