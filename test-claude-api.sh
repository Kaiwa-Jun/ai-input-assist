#!/bin/bash

# Test Claude API call
# Usage: ANTHROPIC_API_KEY=your-key ./test-claude-api.sh

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "Error: ANTHROPIC_API_KEY environment variable is not set"
  exit 1
fi

# Simple test prompt
PROMPT="Hello, can you respond with a simple greeting?"

echo "Testing Claude API..."
echo "Sending request to Claude API..."

# Make the API call and capture the full response
RESPONSE=$(curl -s -w "\n\nHTTP_STATUS:%{http_code}" -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{
      "role": "user",
      "content": "Hello, can you respond with a simple greeting?"
    }],
    "temperature": 0.7
  }')

# Extract HTTP status code
HTTP_STATUS=$(echo "$RESPONSE" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS:/d')

echo "HTTP Status: $HTTP_STATUS"
echo "Response body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

# Try to extract the text content
if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "\nExtracted text:"
  echo "$BODY" | jq -r '.content[0].text'
else
  echo -e "\nError: API call failed with status $HTTP_STATUS"
fi