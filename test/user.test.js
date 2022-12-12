const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

let should = chai.should();

chai.use(chaiHttp);

describe('/GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/user/')
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
describe('/POST user', () => {
    it('it should POST a user', (done) => {
        const user = {
            firstName: "Muhire Ngaboyisonga",
            lastName: "Mwitero",
            email: "mwitero12@gmail.com",
            password: "hellomwitero"
        }
        chai.request(server)
            .post('/api/v1/user/newuser')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Account created. Please verify via email!");
                res.body.should.have.property("data").be.a("object");
                done();
            });
    });
});
