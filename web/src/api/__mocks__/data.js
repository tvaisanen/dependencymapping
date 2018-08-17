const mappings = [
    {
        "description": "describing mock",
        "name": "mapping one",
        "resources": [
            {
                "connected_to": [],
                "description": "safsda",
                "name": "helo",
                "tags": []
            },
            {
                "connected_to": [],
                "description": "what?",
                "name": "Tell me about it",
                "tags": []
            }
        ],
        "tags": []
    },
        {
        "description": "describing mapping two",
        "name": "mapping two",
        "resources": [
            {
                "connected_to": [],
                "description": "safsda",
                "name": "helo",
                "tags": []
            },
            {
                "connected_to": [],
                "description": "what?",
                "name": "Tell me about it",
                "tags": []
            }
        ],
        "tags": []
    }
];

const assets =[
    {
        "connected_to": [],
        "description": "describing asset one",
        "name": "Test asset 1",
        "tags": []
    },
    {
        "connected_to": [
            {
                "connected_to": [],
                "description": "describing asset one",
                "name": "Test asset 1",
                "tags": []
            }
        ],
        "description": "describing asset two",
        "name": "Test asset 2",
        "tags": []
    }
];

const tags = [
    {
        "description": "describing tag one",
        "name": "Tag one"
    },
    {
        "description": "describing tag two",
        "name": "Tag two"
    }
];



export default {
    mappings: mappings,
    assets: assets,
    tags: tags
}