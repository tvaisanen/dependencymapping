const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    const d = new Date();
    //${d.toUTCString()},
    console.log(`${req.method} ::  ${req.path}, body: ${JSON.stringify(req.body)}`);
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
// docker run --rm --name dmapper-container -p 8081:8081 -d mongo

// connect to the db
mongoose.connect('mongodb://localhost:27017/dmapping');

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

const Asset = mongoose.model('Asset', assetSchema);

function loadDataToDb() {
    assets.forEach(item => {
        const asset = new Asset({...item});
        asset.save().then(saved => {
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

const tagSchema = new mongoose.Schema({
    name: String,
    description: String,
});

let app = express();
app.use(bodyParser.urlencoded({extended: false}))

router.get('/reset-models', (req, res) => {
    Asset.remove().then(r => {
        console.log(r);
    })
        .catch(err => {
            console.log(err);
        });
    loadDataToDb();
    res.send("database initialized")
});

router.get('/', (req, res) => {
    res.send('hello')
});


/*        ASSET API             */

router.get('/asset(/:id)?', (req, res) => {
    const result = assets.filter(a => a.name === req.params.id);

    if (req.params.id) {
        if (result[0]) {
            res.send(JSON.stringify(result[0]));
        } else {
            res.send(`assets: id-${req.params.id}`);
        }
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
    const result = tags.filter(a => a.name === req.params.id);

    if (req.params.id) {
        if (result[0]) {
            res.send(JSON.stringify(result[0]));
        } else {
            res.send(`assets: id-${req.params.id}`);
        }
    } else {
        res.send(JSON.stringify(tags));
    }


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


const tags = [
    {
        'name': 'TestPage',
        'description': 'Describe Tag/GwCategory TestPage here.',
    },
    {
        'name': 'TestTag',
        'description': 'Describe Tag/GwCategory TestTag here.',
    },
    {
        'name': 'OtherTag',
        'description': 'Describe Tag/GwCategory OtherTag here.',
    },
]

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
