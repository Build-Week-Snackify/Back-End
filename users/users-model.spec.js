const db = require('../database/dbConfig');
const { insert } = require('./users-model');

describe('users model', function () {
    
    describe('insert()', function () {
        beforeEach(async () => {
            await db('org').truncate();
        })

        it('should insert the provided organization', async function () {

            await insert({
                username: 'hello',
                password: 'goodbye',
                email: 'tester@yahoo.com',
                phoneNumber: '123-4578',
                streetAddress: '123 Tester',
                state: 'Nowhere',
                zipcode: '12345',
                organizationName: 'Tester',
                contactPerson: 'Fake Person',
                role: 'organization'
            })

            const org = await db('org')

            expect(org).toHaveLength(1);
        })
    })
})