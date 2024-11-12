#!/bin/bash

# Imitate a compactor IoT named `device_name` sending readings to the BE server `socket` ("name:port")
# # Example usage:
# ./submit_reading.sh be:3000 thing-1
#

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <socket> <device_name>"
  exit 1
fi

SOCKET=$1
DEVICE_NAME=$2

# Define file to store the current fullness level
FULLNESS_FILE="/${DEVICE_NAME}_fullness_level.txt"

# Initialize fullness level if the file does not exist
if [ ! -f "$FULLNESS_FILE" ]; then
  echo "0" > "$FULLNESS_FILE"
fi

CURRENT_FULLNESS=$(cat "$FULLNESS_FILE")

# Increment fullness level (e.g., by 20 per run) until it reaches 100
NEW_FULLNESS=$((CURRENT_FULLNESS + 20))
if [ "$NEW_FULLNESS" -gt 100 ]; then
  NEW_FULLNESS=100
fi

# Update the fullness level in the file
echo "$NEW_FULLNESS" > "$FULLNESS_FILE"

# Generate a current timestamp in ISO 8601 format
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Define the API endpoint
API_URL="http://$SOCKET/api/readings"

# Execute the POST request with curl
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "'"$DEVICE_NAME"'",
    "fullness_level": '"$NEW_FULLNESS"',
    "timestamp": "'"$TIMESTAMP"'"
  }'

echo "POST request sent to $API_URL with device_id=$DEVICE_NAME, fullness_level=$NEW_FULLNESS, timestamp=$TIMESTAMP"
