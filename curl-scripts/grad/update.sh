API="http://localhost:4741"
URL_PATH="/grads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "person": {
      "name": "'"${NAME}"'",
      "identity": "'"${IDENTITY}"'",
      "compliment": "'"${COMP}"'",
      "interests": "'"${INTERESTS}"'",
      "imageUrl": "'"${IMG}"'",
      "assignedToUser": "'"${TOUSER}"'",
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
