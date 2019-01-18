import {ASSET} from "../../constants";
import {
    parseHALResponseData
} from "../response-parser";

const HALAsset =     {
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






it("Should parse HAL asset to Asset", () => {

    const result = parseHALResponseData(ASSET, HALAsset);
    const expected =     {
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
})