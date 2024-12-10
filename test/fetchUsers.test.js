import { fetchUsers } from '../fetchUsers.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('fetchUsers', function () {
  it('should return an array of users', async function (){
    const users = await fetchUsers();
    expect(users).to.be.an('array');
  });

  describe('fetchUsers using stub', function () {
    //initialize the stub with a response
    let stub;
    const testUsers = [
      {id: 1, name: 'Leanne Graham'}, 
      {id: 2, name: 'Ervin Howell'}
    ];

    beforeEach(function () {
      //initialize the stub with a response
      stub = sinon.stub(global, 'fetch');
      stub.resolves({
        ok: true,
        json: async () => testUsers,
      });
    });
    
    afterEach(function () {
      stub.restore();
    });

    it('should return the same users as the API returns', async function(){
      //call and test the function
      const users = await fetchUsers();
      expect(users).to.have.lengthOf(2);
      expect(users).to.deep.equal(testUsers);
    });

    it('should print names', function(done){
      //call and test the function
      fetchUsers();
      done();
      expect(consoleSpy.calledTwice).to.be.true;
      testUsers.forEach(user => {
        expect(consoleSpy.calledWith(user.name)).to.be.true
      });
    });
  });

  it('should return undefined when the API fails', async function(){
    let errorstub = sinon.stub(global, 'fetch');
    try {
    errorstub.rejects(new Error('Network error'));
    const users = await fetchUsers();
    expect(users).to.be.undefined;
    } finally {
    errorstub.restore();
    }
  });
});
