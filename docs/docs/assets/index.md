
# Schema 

Asset is defined as following:

    const assetSchema = new mongoose.Schema({
        _id: { type: ObjectId, auto: true },
        name: String,
        description: String,
        connected_to: [String],
        tags: [String],
        group: {type: String, default: ""},
        nodeShape: {type: String, default: "ellipse"},
        nodeColor: {type: String, default: "navyblue"}
    });

Assets are created on the server side.

## Requirements

**R1 ) ID is unique**: 
> Automated by the database.

**R2 ) Name is unique**: 
> API endpoint is responsible 
    
**R3 ) Every asset pointed in connected_to need to exist after success **:
> On Save hook?
    
**R4 ) Every tag pointed in tags need to exist after success**:
> On Save hook?
    
**R5 ) asset pointed by group need to exist or otherwise empty string**:
> On Save hook?

___

## API 

### Get

* `/assets/<name>`
* `assets/?<query>`

### Post

* `/assets/`, body: JSON asset object


## Client

Accessing the API from the application is done via
asset actions (`asset.actions.js`).

### Get a asset detail

![Post asset sequence diagram](/assets/fig:get-asset.svg)

### Post a new asset 

Create a new asset.

![Post asset sequence diagram](/assets/fig:post-asset.svg)


### Update an asset 

Update asset by a set of key-value pairs. The updated
version of the asset is created by the client.

![Post asset sequence diagram](/assets/fig:update-asset.svg)

### Delete an asset 

Delete an asset. If server returns OK delete asset reference
on client application.

![Post asset sequence diagram](/assets/fig:delete-asset.svg)





