#!/bin/bash
API_KEY="919773889547126"
API_SECRET="JMVPJA_X7wQwUY-ZwH4o6Ntya7U"
CLOUD_NAME="djdp7vvpm"
FOLDER="Sultan-Bakery-Menu"

OUTPUT="Sultan-Bakery-Menu-links.txt"
> "$OUTPUT"

NEXT_CURSOR=""
PAGE=1

echo "Fetching images from folder: $FOLDER ..."

while true; do
  echo "→ Page $PAGE"

  # Build the base command
  CMD=(curl -s -u "$API_KEY:$API_SECRET" \
    -X POST "https://api.cloudinary.com/v1_1/$CLOUD_NAME/resources/search" \
    -d "expression=folder:$FOLDER" \
    -d "max_results=500")

  # Add next_cursor if exists
  if [ -n "$NEXT_CURSOR" ] && [ "$NEXT_CURSOR" != "null" ]; then
    CMD+=(-d "next_cursor=$NEXT_CURSOR")
  fi

  # Execute the request
  RESP=$("${CMD[@]}")

  # Extract URLs
  echo "$RESP" | jq -r '.resources[].secure_url' >> "$OUTPUT"

  # Get the next cursor
  NEXT_CURSOR=$(echo "$RESP" | jq -r '.next_cursor')

  # Break if no more pages
  if [ "$NEXT_CURSOR" = "null" ] || [ -z "$NEXT_CURSOR" ]; then
    break
  fi

  PAGE=$((PAGE+1))
  sleep 1  # avoid rate limit
done

echo "✅ Done. Saved all URLs to $OUTPUT"
