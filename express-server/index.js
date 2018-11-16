const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(`Time: ${Date.now()}, ${req.path}, body: ${req.body}`);
  next();
});

const assets = [
    {
        'name': 'TestPageOne',
        'description': "Describe TestPageOne here.",
        'dependency': ['TestPageFour'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageTwo',
        'description': "Describe TestPageTwo here.",
        'dependency': ['TestPageThree'],
        'tags': ['TestPage']
    },
    {
        'name': 'TestPageThree',
        'description': "Describe TestPageThree here.",
        'dependency': ['TestPageOne', 'TestPageFour'],
        'tags': ['TestPage', 'TestTag']
    },
    {
        'name': 'TestPageFour',
        'description': "Describe TestPageFour here.",
        'dependency': [],
        'tags': ['TestPage', 'TestTag']
    }
];
// docker run --rm --name dmapper-container -p 8081:8081 -d mongo

// connect to the db
mongoose.connect('mongodb://localhost:8081/dmapping');

const assetSchema = new mongoose.Schema({
    name: String,
    description: String,
    dependencies: [String],
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

router.get('/reset-models', (req, res) => {
    Asset.remove()
        .then(r => {
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
            .then(assets => {
                console.log(assets);
                res.send(assets)
            })
            .catch(err => res.send(err));
    }

});

router.put('/asset(/:id)?', (req, res) => {
    const query = { name: req.param.id };
    const updatedAsset = req.body;
    Asset.findOne(query)
        .then(r => {
            console.log(r);
            res.send(r);
        }).catch(err => {
            res.send(err);
    });
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
