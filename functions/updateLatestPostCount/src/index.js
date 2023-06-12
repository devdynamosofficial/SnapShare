const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const database = new sdk.Databases(client);
  
  var obj = req.payload;

  if (!req.variables['API_KEY']) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(req.variables['PROJECT'])
      .setKey(req.variables['API_KEY'])
      .setSelfSigned(true);
      const friends = database.listDocuments(req.variables["DATABASE_ID"], req.variables["COLLECTION_ID"], [
        sdk.Query.equal("friend_id", [obj])
      ]);
    
      const response = await friends;
      response.documents.forEach(e=>{
          var latest_post_count = e.latest_post_count+1;
          database.updateDocument(req.variables["DATABASE_ID"], req.variables["COLLECTION_ID"], e.$id, {latest_post_count});
      })
      res.json({
        records_updated: response.documents.map(e=>e.$id).join(",")
      });
  }


};
