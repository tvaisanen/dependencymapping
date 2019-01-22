import {ASSET, CONNECTION, TAG} from "../../constants";
import {
    parseHALResponseData
} from "../response-parser";

const HALAsset = {
    "__v": 0,
    "_embedded": {
        "connected_to": [
            {
                "href": "localhost:3000/asset/?name=TestPageThree",
                "name": "TestPageThree"
            }
        ],
        "group": {
            "href": "",
            "name": ""
        },
        "tags": [
            {
                "href": "localhost:3000/tag/?name=TestPage",
                "name": "TestPage"
            }
        ]
    },
    "_id": "5c41d286a4883900ec3313df",
    "_links": {
        "self": {
            "href": "localhost:3000/asset/5c41d286a4883900ec3313df"
        }
    },
    "connected_to": [
        "TestPageThree"
    ],
    "description": "Describe TestPageTwo here.",
    "group": "",
    "name": "TestPageTwo",
    "nodeColor": "navyblue",
    "nodeShape": "ellipse",
    "tags": [
        "TestPage"
    ]
};

const HALTag = {
    "__v": 0,
    "_id": "5c45b2754238a2002ddea5fd",
    "_links": {
        "self": {
            "href": "localhost:3000/tag/5c45b2754238a2002ddea5fd"
        }
    },
    "description": "Describe gwikicategory / tag TestPage here.",
    "name": "TestPage"
};

const HALConnection = {
    "__v": 0,
    "_embedded": {
        "source": {
            "href": "localhost:3000/connection/TestPageTwo",
            "name": "TestPageTwo"
        },
        "tags": [],
        "target": {
            "href": "localhost:3000/connection/TestPageThree",
            "name": "TestPageThree"
        }
    },
    "_id": "5c471015339dc900580f39e4",
    "_links": {
        "self": {
            "href": "localhost:3000/tag/5c471015339dc900580f39e4"
        }
    },
    "description": "",
    "edgeLabel": "",
    "sourceArrow": false,
    "targetArrow": true
};


it("Should parse HAL asset to Asset", () => {

    const result = parseHALResponseData(ASSET, HALAsset);
    const expected = {
        "_id": "5c41d286a4883900ec3313df",
        "connected_to": [
            "TestPageThree"
        ],
        "description": "Describe TestPageTwo here.",
        "group": "",
        "name": "TestPageTwo",
        "nodeColor": "navyblue",
        "nodeShape": "ellipse",
        "tags": [
            "TestPage"
        ]
    };


    expect(result).toEqual(expected);
});


it("Should parse HAL tag to Tag", () => {

    const result = parseHALResponseData(TAG, HALTag);
    const expected = {
        "_id": "5c45b2754238a2002ddea5fd",
        "description": "Describe gwikicategory / tag TestPage here.",
        "name": "TestPage"
    };

    expect(result).toEqual(expected);
});

it("Should parse HAL connection to Connection", () => {

    const expected = {
        "_id": "5c471015339dc900580f39e4",
        "source": "TestPageTwo",
        "target": "TestPageThree",
        "tags": [],
        "description": "",
        "edgeLabel": "",
        "sourceArrow": false,
        "targetArrow": true
    };

    const result = parseHALResponseData(CONNECTION, HALConnection);


    expect(result).toEqual(expected);
});
