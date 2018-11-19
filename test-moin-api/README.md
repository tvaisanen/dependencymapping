# Tests for MoinMoin.Graphingwiki api 

requires:
- running instance of graphingwiki 
- pytest and optionally pytest-watch

run tests with `pytest` or with watch mode `ptw`

## Setting up the environment

The test data needs to be created upon every test and 
it needs to be teared down after each test.
This happens in `conftest.py`.

file `/wiki/plugin/action/API.py` contains the access point
for the api and the path `/wiki/plugin/action/path/` contains
the rest of the files.

