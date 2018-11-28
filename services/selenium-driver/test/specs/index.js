var assert = require('assert');

describe('localhost:3001 web app', function() {
    it('should have the right title - the fancy generator way', function () {
        browser.url('http://172.17.0.1:3001');
        var title = browser.getTitle();
        console.log(title)
        assert.equal(title, 'Dependency Mapper');
    });

});

