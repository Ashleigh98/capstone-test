const expect= require('chai').expect
const request = require('request')

describe('Status', function(){
    it('status code should be 200', function(done){
        request('http://localhost:8000/displayAll', function(error, response, body){
            console.log(response.statusCode)
            expect(response.statusCode).to.equal(200);
            done()
        })
    })
})