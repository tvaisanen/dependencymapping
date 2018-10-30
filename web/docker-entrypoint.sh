echo "Starting development server.."
if [ ! -d "node_modules" ]; then
   echo "Could not find node_modules.. npm install"
   npm install
fi

npm install --save-dev react-scripts

npm start

