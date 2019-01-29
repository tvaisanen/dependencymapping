import {parsers} from "../store/response-parser";

class ResponseParserConfig {
    constructor(resourceType) {
        this.parseResponseData = parsers.hal[resourceType]
    }
}

export default ResponseParserConfig;