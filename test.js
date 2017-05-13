
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();
let expect = require("chai").expect;

chai.use(chaiHttp);
var l1 = "en-GB";
var complete_user_agent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0";
var software = "X11; Ubuntu; Linux x86_64; rv:53.0";
var ip = getIPAddress();
describe('/GET /', () => {
    it('it should have status 200', (next) => {
        chai.request(server)
            .get('/')
            .set("User-Agent", complete_user_agent)
            .end((err, res) => {
                res.should.have.status(200);
                responseText = JSON.parse(res.text);       
                expect(responseText).to.have.property("software");
                expect(responseText).to.have.property("language");
                expect(responseText).to.have.property("ipaddress");
                next();
            });
    });
    it('it should tell me my OS', (done) => {
            chai.request(server)
                .get('/')
                .set("User-Agent", complete_user_agent)
                .end((err, res) => {
                    responseText = JSON.parse(res.text);       
                    expect(responseText.software).to.equal(software);
                    done();
                });
    });
    it('it should tell me my IP address', (done) => {
            chai.request(server)
                .get('/')
                .set("User-Agent", complete_user_agent)
                .set("Accept-Language", l1)
                .end((err, res) => {
                    responseText = JSON.parse(res.text);       
                    expect(responseText.ipaddress).to.equal(ip);
                    done();
                });
    });
    it('it should tell me my language', (done) => {
            chai.request(server)
                .get('/')
                .set("User-Agent", complete_user_agent)
                .set("Accept-Language", l1)
                .end((err, res) => {
                    responseText = JSON.parse(res.text);       
                    expect(responseText.language).to.equal(l1);
                    done();
                });
    });

});


function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
            }
        }

    return '0.0.0.0';
}
