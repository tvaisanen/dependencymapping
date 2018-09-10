echo "Starting development server.."
if [ ! -d "node_modules" ]; then
   echo "Could not find node_modules.. npm install"
   npm install
fi

echo "$(pwd)"
echo "MESSAGE HERE ${MESSAGE}"
echo "API PATH HERE ${API_PATH}"

npm start

