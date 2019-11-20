const db = require('../database/dbConfig');

const { add } = require('./request-model');

describe('request model', function () {

    describe('add()', function() {
        beforeEach(async () => {
            await db('request').truncate();
        })

        it('should insert the provided request', async function () {
            await add({
                snackName: "Name",
                subId: 1
            })

            const request = await db('request')

            expect(request).toHaveLength(1);
        })
    })
});