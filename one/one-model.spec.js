const db = require('../database/dbConfig');

const { addOne } = require('./one-model');

describe('one model', function () {

    describe('addOne()', function () {
        beforeEach(async () => {
            await db('one').truncate();
        });

        it('should add the provided one time purchase', async function () {

            await addOne({
                "snackName": "Name",
                "subId": 1
            })

            const one = await db('one')

            expect(one).toHaveLength(1)
        })
    })
});