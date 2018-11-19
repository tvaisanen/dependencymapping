const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    const d = new Date();
    //${d.toUTCString()},
    console.log(`\n${req.method} ::  ${req.path}, body: ${JSON.stringify(req.body)}`);
    next();
});

const assets = [
    {
        'name': 'TestPageOne',
        'description': "Describe TestPageOne here.",
        'connected_to': ['TestPageFour'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageTwo',
        'description': "Describe TestPageTwo here.",
        'connected_to': ['TestPageThree'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageThree',
        'description': "Describe TestPageThree here.",
        'connected_to': ['TestPageOne', 'TestPageFour'],
        'tags': ['TestPage', 'TestTag']
    },
    {
        'name': 'TestPageFour',
        'description': "Describe TestPageFour here.",
        'connected_to': [],
        'tags': ['TestPage', 'TestTag']
    }
];

const tags = [
    {
        'name': 'TestPage',
        'description': 'Describe gwikicategory / tag TestPage here.',
    },
    {
        'name': 'TestTag',
        'description': 'Describe gwikicategory / tag TestTag here.',
    },
    {
        'name': 'OtherTag',
        'description': 'Describe gwikicategory / tag OtherTag here.',
    },
]
// docker run --rm --name dmapper-container -p 8081:8081 -d mongo

// connect to the db
const MONGO_PATH = process.env.MONGO_PATH;
const MONGO_PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.DB_NAME;
mongoose.connect(`mongodb://${MONGO_PATH}:${MONGO_PORT}/${DB_NAME}`);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose successful connection:');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

const assetSchema = new mongoose.Schema({
    name: String,
    description: String,
    connected_to: [String],
    tags: [String],
});

const tagSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Asset = mongoose.model('Asset', assetSchema);
const Tag = mongoose.model('Tag', tagSchema);

function loadDataToDb() {
    assets.forEach(item => {
        const asset = new Asset({...item});
        asset.save().then(saved => {
            console.log(`saved: ${saved.name}`);
        }).catch(err => {
            console.log(err);
        })
    });

    tags.forEach(item => {
        const tag = new Tag({...item});
        tag.save().then(saved => {
            console.log(`saved: ${saved.name}`);
        }).catch(err => {
            console.log(err);
        })
    });
}

const mappingSchema = new mongoose.Schema({
    name: String,
    description: String,
    assets: [String],
    tags: [String],
});

let app = express();
app.use(bodyParser.urlencoded({extended: false}))

router.get('/reset-models', (req, res) => {

    Asset.remove()
        .then(r => console.log(r))
        .catch(err => console.log(err));
     Tag.remove()
        .then(r => console.log(r))
        .catch(err => console.log(err));

    loadDataToDb();

    res.send("database initialized")
});

router.get('/', (req, res) => {
    res.send('hello')
});


/*        ASSET API             */

router.get('/asset(/:id)?', (req, res) => {
    console.log("here")
    if (req.params.id) {
        Asset.findOne({name: req.params.id})
            .then(asset => {

                console.log(asset)
                if (!asset){
                   res.status(404).json("Resource does not exist.")
                } else {
                console.log(asset);
                res.status(200).json(asset);
                }

            }).catch(err => res.status(400).json(err));
    } else {
        Asset.find()
            .then(assets => res.send(assets))
            .catch(err => res.send(err));
    }

});

router.post('/asset(/:id)?', (req, res) => {
    console.log(`post: ${req.params.id}`);
    const query = {name: req.param.id};
    const asset = new Asset({...req.body});
    asset.save().then(saved => {
        console.log(`saved: ${saved.name}`);
        res.status(201).json(saved);
    }).catch(err => {
        console.log(err);
    })
});

router.put('/asset(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    const updatedAsset = req.body;
    Asset.update(query, req.body)
        .then(ok => res.status(204).json("Resource updated succesfully."))
        .catch(err => res.status(400).send(err));
});


router.get('/tag(/:id)?', (req, res) => {

    if (req.params.id) {
        Tag.findOne({name: req.params.id})
            .then(tag => {
                if (tag == null){
                    console.log("Tag does not exist.");
                    res.status(404).json("Resource does not exist.")
                } else {
                    console.log(tag);
                    res.status(200).json(tag);
                }
            }).catch(err => res.status(400).json(err));

    } else {
        Tag.find()
            .then(tags => {
                const tagNameList = tags.map(t => t.name);
                console.log(tagNameList);
                res.status(200).json(tagNameList);
            })
            .catch(err => res.status(400).json(err));
    }
});

router.post('/tag(/:id)?', (req, res) => {
    const query = {name: req.param.id};
    const tag = new Tag({...req.body});
    tag.save().then(saved => {
        console.log(`saved: \n${saved}`);
        res.status(201).json(saved);
    }).catch(err => {
        console.log(err);
    })
});

router.put('/tag(/:id)?', (req, res) => {
    const query = {name: req.params.id};
    console.log(query);
    Tag.update(query, req.body)
        .then(ok => res.status(204).json("Resource updated succesfully."))
        .catch(err => res.status(400).send(err));
});

router.get('/mapping(/:id)?', (req, res) => {
    const result = mappings.filter(a => a.name === req.params.id);

    if (req.params.id) {
        if (result[0]) {
            res.send(JSON.stringify(result[0]));
        } else {
            res.send(`assets: id-${req.params.id}`);
        }
    } else {
        res.send(JSON.stringify(mappings));
    }
});


app.use('/test', express.static('pages'));
app.use(router);
app.listen(3000);




const mappings = [
    {
        'name': 'TestMappingOne',
        'description': "Describe TestMappingOne here.",
        'assets': ['TestPageOne', 'TestPageTwo', 'TestPageThree'],
        'tags': ['TestPage', 'TestTag']
    },
    {
        'name': 'TestMappingTwo',
        'description': "Describe TestMappingTwo here.",
        'assets': [],
        'tags': ['TestPage', 'TestTag']
    },

]
