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
      "organization": "'"${ORG}"'",
      "interests": "'"${INTERESTS}"'",
      "imageUrl": "'"${IMG}"'",
      "assignedToUser": "'"${TOUSER}"'",
      "linkedin": "'"${IN}"'",
      "github": "'"${GIBHUB}"'",
      "email": "'"${EMAIL}"'",
      "instagram": "'"${INSTA}"'",
      "adviceContent": "'"${ADVICE}"'",
      "messageContent": "'"${MESSAGE}"'",
      "endorsements": "'"${ENDORSEMENTS}"'"
    }
  }'

echo
