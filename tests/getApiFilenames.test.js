const getApiFilenames = require('../getApiFilenames');

describe('getApiFilenames', () => {
  it('When repo have one api doc file it should be returned', () => {
    const expected = ['tests/repo/project1/docs/hello.apib'];
    expect(getApiFilenames('tests/repo/project1').sort()).toEqual(expected.sort());
  });

  it('When repo have multiple api doc files it should be returned', () => {
    const expected = [
      'tests/repo/project2/docs/bar.apib',
      'tests/repo/project2/docs/world.apib',
    ];
    expect(getApiFilenames('tests/repo/project2').sort()).toEqual(expected.sort());
  });

  it('When repo have node_modules folder its should be ignored', () => {
    expect(getApiFilenames('tests/repo/node_modules')).toHaveLength(0);
  });

});
